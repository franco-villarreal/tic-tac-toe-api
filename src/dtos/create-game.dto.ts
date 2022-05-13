import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PlayerDTO } from './player.dto';

export class CreateGameDTO {
  @IsNotEmpty()
  @IsArray()
  players: PlayerDTO[];

  @IsOptional()
  @IsString()
  starting_player?: string;
}
