import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
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

  @Get('/:challengedId')
  async createChallengeAsync(
    @Req() request,
    @Param('challengedId', ParseIntPipe) challengedId: number,
  ) {
    const userId = request.user.userId as number;

    const challenge = await this.challengeRepository.createChallengeAsync(
      userId,
      challengedId,
    );

    return challenge;
  }
}
