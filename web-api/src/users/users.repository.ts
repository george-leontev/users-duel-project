import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'prisma/generated/prisma';

@Injectable()
export class UsersRepository extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async getAllAsync() {
    const users = await this.user.findMany();

    return users;
  }
}
