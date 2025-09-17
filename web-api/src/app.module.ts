import { Module } from '@nestjs/common';
import { UsersModule } from './users/user.module';
import { RootModule } from './root/root.module';

@Module({
  imports: [UsersModule, RootModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
