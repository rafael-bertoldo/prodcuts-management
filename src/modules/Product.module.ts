import { Module } from '@nestjs/common';
import { ProductController } from '../controllers/Product.controller';
import { ProductService } from '../services/Product.service';
import { PrismaService } from '../services/prisma.service';
import { AuthGuard } from 'src/guards/Auth.guard';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService, PrismaService, {
    provide: AuthGuard,
    useClass: AuthGuard
  }],
})
export class ProductModule {}
