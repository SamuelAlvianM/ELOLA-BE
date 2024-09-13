import { Module } from '@nestjs/common';
import { SavedOrderService } from './saved_order.service';
import { SavedOrderController } from './saved_order.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SavedOrderController],
  providers: [SavedOrderService, PrismaService],
})
export class SavedOrderModule {}
