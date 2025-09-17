import { Module } from '@nestjs/common';
import { RootModule } from './root/root.module';
import { PlayersModule } from './players/players.module';
import { AuthModule } from './auth/auth.module';
import { ChallengeModule } from './challenge/challenge.module';

@Module({
  imports: [PlayersModule, ChallengeModule, AuthModule, RootModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
