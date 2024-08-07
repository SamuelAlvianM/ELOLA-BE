/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get all roles required for the current route
    const role_required = this.reflector.getAllAndOverride<Role[]>(
        ROLES_KEY, 
        [ context.getHandler(), context.getClass()],
    );

    if(!role_required) {
        return true;
    }
    // role(s) yang dibutuhkan untuk request 
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