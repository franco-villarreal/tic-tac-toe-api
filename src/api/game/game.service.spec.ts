import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GameDTO } from 'src/dtos';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an empty list', () => {
      expect(service.findAll(undefined)).toEqual([]);
    });
  });
  describe('findById', () => {
    it('Should throw NotFoundException', () => {
      try {
        service.findById('1');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
    it('Should return found game', () => {
      const game: GameDTO = {
        game_id: 1,
        players: [
          { name: 'PLAYER_ONE', symbol: 'X' },
          { name: 'PLAYER_TWO', symbol: 'O' },
        ],
        board: [
          [undefined, undefined, undefined],
          [undefined, undefined, undefined],
          [undefined, undefined, undefined],
        ],
        next_turn: 'PLAYER_ONE',
        movements_played: 0,
        winner: null,
        finished: false,
      };

      service.create({
        players: [
          { name: 'PLAYER_ONE', symbol: 'X' },
          { name: 'PLAYER_TWO', symbol: 'O' },
        ],
      });

      expect(service.findById('1')).toEqual(game);
    });
  });
  describe('create', () => {
    it('Should create a new game and return it', () => {
      const payload = {
        players: [
          { name: 'PLAYER_ONE', symbol: 'X' },
          { name: 'PLAYER_TWO', symbol: 'O' },
        ],
      };
      const game: GameDTO = {
        game_id: 1,
        players: [
          { name: 'PLAYER_ONE', symbol: 'X' },
          { name: 'PLAYER_TWO', symbol: 'O' },
        ],
        board: [
          [undefined, undefined, undefined],
          [undefined, undefined, undefined],
          [undefined, undefined, undefined],
        ],
        next_turn: 'PLAYER_ONE',
        movements_played: 0,
        winner: null,
        finished: false,
      };

      expect(service.create(payload)).toEqual(game);
    });
  });
  describe('play', () => {
    it('Should make a move and return game status', () => {
      const payload = {
        player: 'PLAYER_ONE',
        column: 0,
        row: 0,
      };
      const game: GameDTO = {
        game_id: 1,
        players: [
          { name: 'PLAYER_ONE', symbol: 'X' },
          { name: 'PLAYER_TWO', symbol: 'O' },
        ],
        board: [
          ['X', undefined, undefined],
          [undefined, undefined, undefined],
          [undefined, undefined, undefined],
        ],
        next_turn: 'PLAYER_TWO',
        movements_played: 1,
        winner: null,
        finished: false,
      };

      service.create({
        players: [
          { name: 'PLAYER_ONE', symbol: 'X' },
          { name: 'PLAYER_TWO', symbol: 'O' },
        ],
      });

      expect(service.play('1', payload)).toEqual(game);
    });
  });
  describe('delete', () => {
    it('Should delete a game and return it', () => {
      const game: GameDTO = {
        game_id: 1,
        players: [
          { name: 'PLAYER_ONE', symbol: 'X' },
          { name: 'PLAYER_TWO', symbol: 'O' },
        ],
        board: [
          [undefined, undefined, undefined],
          [undefined, undefined, undefined],
          [undefined, undefined, undefined],
        ],
        next_turn: 'PLAYER_ONE',
        movements_played: 0,
        winner: null,
        finished: false,
      };

      service.create({
        players: [
          { name: 'PLAYER_ONE', symbol: 'X' },
          { name: 'PLAYER_TWO', symbol: 'O' },
        ],
      });

      expect(service.delete('1')).toEqual(game);
    });
  });
});
