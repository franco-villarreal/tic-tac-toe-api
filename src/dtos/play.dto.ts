import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PlayDTO {
  @IsNotEmpty()
  @IsNumber()
  column: number;

  @IsNotEmpty()
  @IsNumber()
  row: number;

  @IsNotEmpty()
  @IsString()
  player_name: string;
}
