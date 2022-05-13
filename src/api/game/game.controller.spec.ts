import { Test, TestingModule } from '@nestjs/testing';
import { GameDTO } from 'src/dtos';
import { GameController } from './game.controller';
import { GameService } from './game.service';

const gameServiceMock = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  play: jest.fn(),
  delete: jest.fn(),
};

describe('GameController', () => {
  let controller: GameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService],
    })
      .overrideProvider(GameService)
      .useValue(gameServiceMock)
      .compile();

    controller = module.get<GameController>(GameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an empty list', () => {
      const serviceResponse = [];

      const serviceCall = jest
        .spyOn(gameServiceMock, 'findAll')
        .mockReturnValueOnce(serviceResponse);

      expect(controller.findAll(undefined)).toEqual(serviceResponse);

      expect(serviceCall).toHaveBeenCalledWith(undefined);
      expect(serviceCall).toHaveBeenCalledTimes(1);
    });
  });
  describe('findById', () => {
    it('Should return a game', () => {
      const serviceResponse: GameDTO = {
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

      const serviceCall = jest
        .spyOn(gameServiceMock, 'findById')
        .mockReturnValueOnce(serviceResponse);

      expect(controller.findById('1')).toEqual(serviceResponse);

      expect(serviceCall).toHaveBeenCalledWith('1');
      expect(serviceCall).toHaveBeenCalledTimes(1);
    });
  });
  describe('create', () => {
    it('Should return the created game', () => {
      const payload = {
        players: [
          { name: 'PLAYER_ONE', symbol: 'X' },
          { name: 'PLAYER_TWO', symbol: 'O' },
        ],
      };
      const serviceResponse: GameDTO = {
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

      const serviceCall = jest
        .spyOn(gameServiceMock, 'create')
        .mockReturnValueOnce(serviceResponse);

      expect(controller.create(payload)).toEqual(serviceResponse);

      expect(serviceCall).toHaveBeenCalledWith(payload);
      expect(serviceCall).toHaveBeenCalledTimes(1);
    });
  });
  describe('play', () => {
    it('Should execute a move and return the game status', () => {
      const payload = {
        column: 0,
        row: 0,
        player: 'PLAYER_ONE',
      };
      const serviceResponse: GameDTO = {
        game_id: 1,
        players: [
          { name: 'PLAYER_ONE', symbol: 'X' },
          { name: 'PLAYER_TWO', symbol: 'O' },
        ],
        board: [
          ['X', null, null],
          [null, null, null],
          [null, null, null],
        ],
        next_turn: 'PLAYER_TWO',
        movements_played: 1,
        winner: null,
        finished: false,
      };

      const serviceCall = jest
        .spyOn(gameServiceMock, 'play')
        .mockReturnValueOnce(serviceResponse);

      expect(controller.play('1', payload)).toEqual(serviceResponse);

      expect(serviceCall).toHaveBeenCalledWith('1', payload);
      expect(serviceCall).toHaveBeenCalledTimes(1);
    });
  });
  describe('delete', () => {
    it('Should return an empty list', () => {
      const serviceResponse: GameDTO = {
        game_id: 1,
        players: [
          { name: 'PLAYER_ONE', symbol: 'X' },
          { name: 'PLAYER_TWO', symbol: 'O' },
        ],
        board: [
          ['X', null, null],
          [null, null, null],
          [null, null, null],
        ],
        next_turn: 'PLAYER_TWO',
        movements_played: 1,
        winner: null,
        finished: false,
      };

      const serviceCall = jest
        .spyOn(gameServiceMock, 'delete')
        .mockReturnValueOnce(serviceResponse);

      expect(controller.delete('1')).toEqual(serviceResponse);

      expect(serviceCall).toHaveBeenCalledWith('1');
      expect(serviceCall).toHaveBeenCalledTimes(1);
    });
  });
});
