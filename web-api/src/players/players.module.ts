import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersRepository } from './players.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [PlayersController],
  providers: [PlayersRepository, JwtService, AuthGuard],
})
export class PlayersModule {}
