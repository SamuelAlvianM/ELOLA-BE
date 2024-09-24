/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { has_role, hierarchy } from '@prisma/client';

@Injectable()
export class Roles_Guards implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role_required = this.reflector.getAllAndOverride<has_role[]>(
        'roles', [ 
          context.getHandler(), 
          context.getClass()
      ]);

    const required_hierarchy = this.reflector.getAllAndOverride<hierarchy[]>('hierarchy', [
          context.getHandler(),
          context.getClass(),
      ]);

    if(!role_required && !required_hierarchy) {
        return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false;
    }

    const jwtPayload = user.jwtPayload;

    if (user.userType === 'superAdmin') {
      return true;
    }

    const hasRole = role_required.length === 0 || role_required.some(role => user.role === role);

    const hasClass = required_hierarchy.length === 0 || required_hierarchy.some(cls => user.class === cls);

    return hasRole && hasClass;
}
}