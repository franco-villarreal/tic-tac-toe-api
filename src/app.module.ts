import { Module } from '@nestjs/common';

import { GameModule } from './api/game/game.module';

@Module({
  imports: [GameModule],
})
export class AppModule {}
