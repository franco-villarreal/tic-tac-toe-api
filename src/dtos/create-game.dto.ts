import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { PlayerDTO } from './player.dto';

export class CreateGameDTO {
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @ValidateNested({ each: true })
  @Type(() => PlayerDTO)
  players: PlayerDTO[];

  @IsOptional()
  @IsString()
  starting_player?: string;
}
