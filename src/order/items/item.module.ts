import { Module } from '@nestjs/common';
import { ItemService } from './items.service';
import { ItemController } from './items.controller';
import { SavedOrderModule } from '../saved_order/saved_order.module'; 

@Module({
  imports: [SavedOrderModule], 
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemsModule {}