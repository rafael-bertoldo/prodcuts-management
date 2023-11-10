import { Module } from '@nestjs/common';
import { UserModule } from './User.module';
import { AuthModule } from './Auth.module';

@Module({
  imports: [UserModule, AuthModule],
})
export class AppModule {}
