import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'prisma/generated/prisma';

@Injectable()
export class PlayersRepository extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async getAllAsync(userId: number) {
    const users = await this.player.findMany({
      where: {
        userId: {
          not: userId,
        },
      },
    });

    return users;
  }
}
