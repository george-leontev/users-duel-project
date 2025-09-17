import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('api/users')
export class UsersController {
  constructor(private readonly userRepository: UsersRepository) {}

  @Get(':id')
  async getAsync(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userRepository.getAsync(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
