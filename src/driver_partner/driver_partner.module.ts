import { Module } from '@nestjs/common';
import { DriverPartnerService } from './driver_partner.service';
import { DriverPartnerController } from './driver_partner.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [DriverPartnerController],
  providers: [DriverPartnerService],
})
export class DriverPartnerModule {}
