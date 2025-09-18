import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PlayersRepository extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async getAllAsync(userId: number) {
    const players = await this.player.findMany({
      where: {
        userId: {
          not: userId,
        },
      },
    });

    return players;
  }

  async getByIdAsync(id: number) {
    const player = await this.player.findMany({
      where: {
        id: id,
      },
    });

    return player;
  }
}
