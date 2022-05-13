import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { Game } from '../../components';
import { GameDTO } from '../../dtos';
import { ErrorMessage } from '../../enums';

@Injectable()
export class GameService {
  private id: number;
  private games: Game[];

  constructor() {
    this.id = 1;
    this.games = [];
  }

  findAll(finished: string): GameDTO[] {
    let games = this.games;

    if (finished)
      games = games.filter((game) => game.finished.toString() === finished);

    return games.map((game) => game.getGameStatus());
  }

  findById(gameId: string): GameDTO {
    const game = this.findGameById(gameId);

    return game.getGameStatus();
  }

  create(payload: any): GameDTO {
    try {
      const { players, starting_player: nextTurn } = payload;

      const newGame = new Game(this.id, players, nextTurn);

      this.games.push(newGame);

      this.id++;

      return newGame.getGameStatus();
    } catch (error) {
      Logger.error(
        'There was an error: ' + JSON.stringify(error) + error.stack,
      );

      if (
        error.message === ErrorMessage.INVALID_PLAYER_NAME ||
        error.message === ErrorMessage.INVALID_PLAYER_SYMBOL
      )
        throw new BadRequestException(error.message);

      throw error;
    }
  }

  play(gameId: string, payload: any): GameDTO {
    try {
      const { column, row, player: playerName } = payload;
      const game = this.findGameById(gameId);

      game.play(column, row, playerName);

      return game.getGameStatus();
    } catch (error) {
      Logger.error(
        'There was an error: ' + JSON.stringify(error) + error.stack,
      );

      if (
        error.message === ErrorMessage.GAME_OVER ||
        error.message === ErrorMessage.INVALID_MOVE ||
        error.message === ErrorMessage.INVALID_TURN
      )
        throw new BadRequestException(error.message);

      throw error;
    }
  }

  delete(gameId: string): GameDTO {
    const foundGame = this.findGameById(gameId);

    this.games = this.games.filter(
      (game) => game.game_id !== foundGame.game_id,
    );

    return foundGame;
  }

  private findGameById(gameId: string): Game {
    const game = this.games.find((game) => game.game_id === parseInt(gameId));

    if (!game) {
      throw new NotFoundException(ErrorMessage.GAME_NOT_FOUND);
    }

    return game;
  }
}
