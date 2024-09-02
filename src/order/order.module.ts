import { Module } from '@nestjs/common';
import { ItemsModule } from './items/item.module';
import { TransactionModule } from './transaction/transaction.module';
import { OrderTypeModule } from './order_type/order_type.module';
import { SavedOrderModule } from './saved_order/saved_order.module'; 

@Module({
  imports: [
    ItemsModule,
    TransactionModule,
    OrderTypeModule,
    SavedOrderModule,
  ],
  exports: [
    ItemsModule,
    TransactionModule,
    OrderTypeModule,
    SavedOrderModule, 
  ],
})
export class OrderModule {}