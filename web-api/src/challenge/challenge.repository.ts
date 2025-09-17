import {
  ConflictException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from 'prisma/generated/prisma';

@Injectable()
export class ChallengeRepository extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async createChallengeAsync(challengerId: number, challengedId: number) {
    return this.$transaction(async (prisma) => {
      const challenger = await prisma.player.findUnique({
        where: { id: challengerId },
      });

      const challenged = await prisma.player.findUnique({
        where: { id: challengedId },
      });

      if (!challenger || !challenged) {
        throw new NotFoundException('One or both players not found');
      }

      if (challengerId === challengedId) {
        throw new ConflictException('Cannot challenge yourself');
      }

      const randomWinner = Math.random() < 0.5 ? challengerId : challengedId;

      const challenge = await prisma.challenge.create({
        data: {
          challengerId,
          challengedId,
          winnerId: randomWinner,
        },
      });

      return challenge;
    });
  }
}
