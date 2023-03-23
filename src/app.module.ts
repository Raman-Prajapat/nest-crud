import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { OuterModule } from './outer/outer.module';

@Module({
  imports: [OuterModule, AuthModule],
})
export class AppModule {}
