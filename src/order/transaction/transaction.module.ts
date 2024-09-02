import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { SavedOrderModule } from '../saved_order/saved_order.module'; 

@Module({
  imports: [SavedOrderModule], 
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}