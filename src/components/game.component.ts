import { GameDTO, PlayerDTO } from '../dtos';
import { ErrorMessage } from '../enums';
import { Player } from './player.component';

const BOARD_MAX_SIZE = 3;
const SYMBOL_X = 'X';
const SYMBOL_O = 'O';

export class Game {
  game_id: number;
  players: Player[];
  movements_played: number;
  next_turn: string;
  board: string[][];
  winner: string;
  finished: boolean;

  constructor(game_id: number, players: PlayerDTO[], next_turn?: string) {
    this.game_id = game_id;
    this.initializePlayers(players);
    this.movements_played = 0;
    this.next_turn = next_turn ? next_turn : this.players[0].name;
    this.winner = null;
    this.finished = false;
    this.initializeBoard();
  }

  initializeBoard() {
    const board = new Array<string[]>();

    for (let x = 0; x < BOARD_MAX_SIZE; x++) {
      board.push(new Array<string>(BOARD_MAX_SIZE));
    }

    this.board = board;
  }

  initializePlayers(players: PlayerDTO[]) {
    const [playerOne, playerTwo] = players;

    playerOne.name = playerOne.name.toUpperCase();
    playerTwo.name = playerTwo.name.toUpperCase();

    if (playerOne.name === playerTwo.name) {
      throw new Error(ErrorMessage.INVALID_PLAYER_NAME);
    }

    playerOne.symbol = playerOne.symbol
      ? playerOne.symbol.split('')[0].toUpperCase()
      : (playerOne.symbol = SYMBOL_X);

    playerTwo.symbol = playerTwo.symbol
      ? playerTwo.symbol.split('')[0].toUpperCase()
      : SYMBOL_O;

    if (playerOne.symbol === playerTwo.symbol) {
      throw new Error(ErrorMessage.INVALID_PLAYER_SYMBOL);
    }

    this.players = [
      { name: playerOne.name, symbol: playerOne.symbol },
      { name: playerTwo.name, symbol: playerTwo.symbol },
    ];
  }

  getGameStatus(): GameDTO {
    return {
      game_id: this.game_id,
      players: this.players,
      movements_played: this.movements_played,
      next_turn: this.next_turn,
      board: this.board,
      winner: this.winner,
      finished: this.finished,
    };
  }

  whoIsNextTurn(): string {
    return !this.winner
      ? this.players.find((player) => player.name !== this.next_turn).name
      : null;
  }

  setNextTurn() {
    this.next_turn = this.whoIsNextTurn();
  }

  play(column: number, row: number, playerName: string) {
    playerName = playerName.toUpperCase();

    if (this.finished) {
      throw new Error(ErrorMessage.GAME_OVER);
    }
    if (this.next_turn !== playerName) {
      throw new Error(ErrorMessage.INVALID_TURN);
    }
    if (
      column >= BOARD_MAX_SIZE ||
      row >= BOARD_MAX_SIZE ||
      this.board[column][row]
    ) {
      throw new Error(ErrorMessage.INVALID_MOVE);
    }

    this.board[column][row] = this.players.find(
      (player) => player.name === playerName,
    ).symbol;

    this.increaseMovementsPlayed();
    this.isGameOver(playerName);
    this.setNextTurn();
  }

  finish() {
    this.finished = true;
  }

  increaseMovementsPlayed(): void {
    this.movements_played++;
  }

  isGameOver(playerName: string) {
    let winner = null;
    let pos = 0;
    let baseSymbol: string;

    while (pos < 3 && !winner) {
      baseSymbol = this.board[pos][0];

      if (
        baseSymbol &&
        baseSymbol === this.board[pos][1] &&
        baseSymbol === this.board[pos][2]
      ) {
        winner = playerName;
      }

      baseSymbol = this.board[0][pos];

      if (
        baseSymbol &&
        baseSymbol === this.board[1][pos] &&
        baseSymbol === this.board[2][pos]
      ) {
        winner = playerName;
      }

      pos++;
    }

    if (!winner) {
      baseSymbol = this.board[1][1];
      if (baseSymbol) {
        if (
          (this.board[0][0] === baseSymbol &&
            baseSymbol === this.board[2][2]) ||
          (this.board[2][0] === baseSymbol && baseSymbol === this.board[0][2])
        ) {
          winner = playerName;
        }
      }
    }

    if (!winner && this.movements_played >= BOARD_MAX_SIZE * BOARD_MAX_SIZE) {
      this.finish();
    }

    if (winner) {
      this.winner = playerName;
      this.finish();
    }
  }
}
