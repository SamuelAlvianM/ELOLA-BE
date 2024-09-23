/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SUPER_ADMIN_KEY } from '../decorator/roles.decorator';
import { has_role, hierarchy } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class Super_Admin_Guard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService
) {}

async canActivate(context: ExecutionContext): Promise<boolean> {
    const role_required = this.reflector.getAllAndOverride<boolean>(
      SUPER_ADMIN_KEY,
      [context.getHandler(), context.getClass()],
    );

    if(!role_required) {
        return true;
    }

    const request  = context.switchToHttp().getRequest();
    const super_admin = request.super_admin;

    if(!super_admin || super_admin.role !== 'super_admin') {
        throw new ForbiddenException('You do not have super admin privileges');
    }

    return true;

  }
}