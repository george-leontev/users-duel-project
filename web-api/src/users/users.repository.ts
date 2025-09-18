import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserModel } from './models/user-model';

@Injectable()
export class UsersRepository extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async getAsync(id: number): Promise<UserModel | null> {
    const user = await this.user.findUnique({
      where: { id: id },
    });

    return user && (user as UserModel);
  }

  async getByEmail(email: string): Promise<UserModel | null> {
    const user = await this.user.findUnique({
      where: { email: email },
    });

    return user && (user as UserModel);
  }
}
