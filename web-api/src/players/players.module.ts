import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersRepository } from './players.repository';

@Module({
  controllers: [PlayersController],
  providers: [PlayersRepository],
})
export class PlayersModule {}
