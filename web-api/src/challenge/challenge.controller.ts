import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ChallengeRepository } from './challenge.repository';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('/api/challenge')
export class ChallengeController {
  constructor(private readonly challengeRepository: ChallengeRepository) {}

  @Get('/:challengerId/:challengedId')
  async createChallengeAsync(
    @Param('challengerId', ParseIntPipe) challengerId: number,
    @Param('challengedId', ParseIntPipe) challengedId: number,
  ) {
    const challenge = await this.challengeRepository.createChallengeAsync(
      challengerId,
      challengedId,
    );

    return challenge;
  }
}
