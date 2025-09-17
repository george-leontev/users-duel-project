import { Controller, Get } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Get()
  async getAllAsync() {
    const users = await this.usersRepository.getAllAsync();

    return users;
  }
}
