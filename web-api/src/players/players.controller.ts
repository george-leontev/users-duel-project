import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PlayersRepository } from './players.repository';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('/api/players')
export class PlayersController {
  constructor(private readonly playersRepository: PlayersRepository) {}

  @Get()
  async getAllAsync(@Req() request) {
    const userId = request.user.userId as number;

    const users = await this.playersRepository.getAllAsync(userId);

    return users;
  }

  @Get(':id')
  async getByIdAsync(@Param('id', ParseIntPipe) id: number) {
    const user = await this.playersRepository.getByIdAsync(id);

    return user;
  }
}
