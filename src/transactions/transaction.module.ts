import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OpenCloseService } from 'src/open_close/open_close.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService, OpenCloseService],
})
export class TransactionModule {}