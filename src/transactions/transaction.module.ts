import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OpenCloseService } from 'src/open_close/open_close.service';
import { UserModule } from 'src/user/user.module';
import { SavedOrderModule } from '../saved_order/saved_order.module';

@Module({
  imports: [UserModule, SavedOrderModule] ,
  controllers: [TransactionController],
  providers: [TransactionService, PrismaService, OpenCloseService],
})
export class TransactionModule {}
