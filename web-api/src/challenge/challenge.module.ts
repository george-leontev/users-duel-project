import { Module } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { ChallengeRepository } from './challenge.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [ChallengeController],
  providers: [ChallengeRepository, JwtService, AuthGuard],
})
export class ChallengeModule {}
