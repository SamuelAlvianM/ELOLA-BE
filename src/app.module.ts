/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { StoreModule } from './store/store.module';
import { PaymentModule } from './payment/payment.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { TransactionModule } from './transactions/transaction.module';
import { TaxModule } from './tax/tax.module';
import { DriverPartnerModule } from './driver_partner/driver_partner.module';
import { PromoModule } from './promo/promo.module';
import { ProductCategoryModule } from './product_category/productCategory.module';
import { InventoryModule } from './inventory/inventory.module';
import { OpenCloseModule } from './open_close/open_close.module';
import { JwtStrategy } from './auth/middleware/jwt.strategy';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    StoreModule,
    PromoModule,
    InventoryModule,
    ProductCategoryModule,
    PaymentModule,
    ProductModule,
    SupplierModule,
    TransactionModule,
    OpenCloseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '24h'},

    }),
    TaxModule,
    DriverPartnerModule,
    OpenCloseModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService, JwtStrategy],
})
export class AppModule {}
