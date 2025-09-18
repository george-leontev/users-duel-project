import {
  ConflictException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const randomlyDetermineWinner = (
  challengerId: number,
  challengedId: number,
): number => {
  const randomValue = Math.random();

  if (randomValue < 0.5) {
    return challengerId;
  } else if (randomValue > 0.5) {
    return challengedId;
  }

  return challengerId;
};

@Injectable()
export class ChallengeRepository extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async createChallengeAsync(challengerId: number, challengedId: number) {
    const challenger = await this.player.findUnique({
      where: { id: challengerId },
    });

    const challenged = await this.player.findUnique({
      where: { id: challengedId },
    });

    if (!challenger || !challenged) {
      throw new NotFoundException('One or both players not found');
    }

    if (challengerId === challengedId) {
      throw new ConflictException('Cannot challenge yourself');
    }

    const winner = randomlyDetermineWinner(challengerId, challengedId);

    const challenge = await this.challenge.create({
      data: {
        challengerId,
        challengedId,
        winnerId: winner,
      },
    });

    return challenge;
  }
}
