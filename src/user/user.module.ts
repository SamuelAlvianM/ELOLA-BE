import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
