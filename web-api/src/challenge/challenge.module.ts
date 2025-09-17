import { Module } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { ChallengeRepository } from './challenge.repository';

@Module({
  controllers: [ChallengeController],
  providers: [ChallengeRepository],
})
export class ChallengeModule {}
