import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';  // Adjust the import path based on your project structure
import { OrderController } from './order_type.controller';
import { OrderService } from './order_type.service';
import { SavedOrderModule } from '../saved_order/saved_order.module';

@Module({
  imports: [SavedOrderModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderTypeModule {}
