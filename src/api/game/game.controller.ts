import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { CreateGameDTO, GameDTO, PlayDTO } from '../../dtos';
import { GameService } from './game.service';

@Controller('api/game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  findAll(@Query('finished') finished?: string): GameDTO[] {
    return this.gameService.findAll(finished);
  }

  @Get('/:id')
  findById(@Param('id') id: string): GameDTO {
    return this.gameService.findById(id);
  }

  @Post()
  create(@Body() payload: CreateGameDTO): GameDTO {
    return this.gameService.create(payload);
  }

  @Post('/:id')
  play(@Param('id') id: string, @Body() payload: PlayDTO): GameDTO {
    return this.gameService.play(id, payload);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): GameDTO {
    return this.gameService.delete(id);
  }
}
