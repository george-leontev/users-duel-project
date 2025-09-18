import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PlayersRepository extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async getAllAsync() {
    const players = await this.player.findMany({
      include: {
        _count: {
          select: {
            winner: true,
          },
        },
      },
    });

    const playersWithScore = players.map((player) => {
      const score = player._count.winner;
      delete (player as any)._count;

      return { ...player, score };
    });

    return playersWithScore;
  }

  async getByIdAsync(id: number) {
    const player = await this.player.findUnique({
      where: {
        id: id,
      },
    });

    return player;
  }
}
