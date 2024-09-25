/* eslint-disable prettier/prettier */
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TaxModule } from './tax/tax.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './user/user.service';
import { PromoModule } from './promo/promo.module';
import { PrismaModule } from './prisma/prisma.module';
import { OutletModule } from './outlet/outlet.module';
import { PrismaService } from './prisma/prisma.service';
import { PaymentModule } from './payment/payment.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { DriverPartnerModule } from './driver_partner/driver_partner.module';
import { ProductCategoryModule } from './product_category/productCategory.module';
import { BranchModule } from './branch/branch.module';
import { CompanyModule } from './company/company.module';
import { JwtStrategy } from './auth/middleware/jwt.strategy';
import { InventoryModule } from './inventory/inventory.module';
import { OpenCloseModule } from './open_close/open_close.module';
import { SavedOrderModule } from './saved_order/saved_order.module';
import { TransactionModule } from './transactions/transaction.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    TaxModule,
    UserModule,
    PromoModule,
    BranchModule,
    OutletModule,
    PaymentModule,
    ProductModule,
    CompanyModule,
    SupplierModule,
    InventoryModule,
    OpenCloseModule,
    OpenCloseModule,
    SavedOrderModule,
    TransactionModule,
    DriverPartnerModule,
    ProductCategoryModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '24h'},

    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService, JwtStrategy],
})
export class AppModule {}
