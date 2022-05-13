import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PlayerDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  symbol?: string;
}
