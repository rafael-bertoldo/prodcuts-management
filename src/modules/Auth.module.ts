import { Module } from '@nestjs/common';
import { UserModule } from './User.module';
import { AuthService } from 'src/services/Auth.service';
import { AuthController } from 'src/controllers/Auth.controller';
import { PrismaService } from 'src/services/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY!,
      signOptions: { expiresIn: process.env.EXPIRES_IN! }
    })
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}