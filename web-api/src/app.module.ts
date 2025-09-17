import { Module } from '@nestjs/common';
import { RootModule } from './root/root.module';
import { PlayersModule } from './players/players.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PlayersModule, AuthModule, RootModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
