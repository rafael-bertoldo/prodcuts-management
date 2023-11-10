import { Module } from '@nestjs/common';
import { UserController } from '../controllers/User.controller';
import { UserService } from '../services/User.service';
import { PrismaService } from '../services/prisma.service';
import { AuthGuard } from 'src/guards/Auth.guard';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, {
    provide: AuthGuard,
    useClass: AuthGuard
  }],
})
export class UserModule {}
