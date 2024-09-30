import { Module } from '@nestjs/common';
import { OpenCloseController } from './open_close.controller';
import { OpenCloseService } from './open_close.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [OpenCloseController],
  providers: [OpenCloseService, PrismaService],
})
export class OpenCloseModule {}