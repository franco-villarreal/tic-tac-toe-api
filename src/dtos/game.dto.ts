import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

import { PlayerDTO } from './player.dto';

export class GameDTO {
  @IsNumber()
  game_id: number;

  @IsArray()
  players: PlayerDTO[];

  @IsNumber()
  movements_played: number;

  @IsString()
  next_turn: string;

  @IsArray()
  board: string[][];

  @IsString()
  winner: string;

  @IsBoolean()
  finished: boolean;
}
