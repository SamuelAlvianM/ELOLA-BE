/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CLASS_KEY } from '../decorator/roles.decorator';
import { hierarchy } from '@prisma/client';

@Injectable()
export class Class_Guards implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {

    const role_required = this.reflector.getAllAndOverride<hierarchy[]>(
        CLASS_KEY, 
        [ context.getHandler(), context.getClass()],
    );

    if(!role_required) {
        return true;
    }

    const request  = context.switchToHttp().getRequest();
    const user = request.user;

    if(!user) {
        throw new ForbiddenException('you do not have permission to access this resource');
    }

    if (user.super_admin_id) {
      return true;
    }

    const hasRole =  () => role_required.some((role) => user.role.includes(role));

    if (!hasRole()) {
      throw new ForbiddenException('You do not have the required roles');
    }

    return true;

  }
}