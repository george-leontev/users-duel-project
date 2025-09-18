import {
  ConflictException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ChallengeRepository extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async createChallengeAsync(userId: number, challengedId: number) {
    const challenger = await this.player.findFirst({
      where: { userId: userId },
    });

    const challenged = await this.player.findUnique({
      where: { id: challengedId },
    });

    if (!challenger || !challenged) {
      throw new NotFoundException('One or both players not found');
    }

    if (challenger.id === challengedId) {
      throw new ConflictException('Cannot challenge yourself');
    }

    const winnerId = Math.random() >= 0.5 ? challenger.id : challengedId;

    const challenge = await this.challenge.create({
      data: {
        challengerId: challenger.id,
        challengedId,
        winnerId,
      },
    });

    return challenge;
  }
}
