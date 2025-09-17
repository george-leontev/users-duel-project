import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { PlayersRepository } from './players.repository';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('/api/players')
export class PlayersController {
  constructor(private readonly playersRepository: PlayersRepository) {}

  @Get()
  async getAllAsync(@Req() request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = request.user;
    console.log(user);

    const users = await this.playersRepository.getAllAsync();

    return users;
  }
}
