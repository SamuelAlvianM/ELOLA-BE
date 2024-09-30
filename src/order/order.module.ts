import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OpenCloseService } from 'src/open_close/open_close.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService, OpenCloseService],
})
export class OrderModule {}
