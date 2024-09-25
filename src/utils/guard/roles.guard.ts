import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, CLASS_KEY } from '../decorator/roles.decorator';
import { has_role, hierarchy } from '@prisma/client';
import { Auth_Payload } from 'src/auth/middleware/jwt.strategy';

@Injectable()
export class Roles_Guards implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roleRequired = this.reflector.getAllAndOverride<has_role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const requiredHierarchy = this.reflector.getAllAndOverride<hierarchy[]>(CLASS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!roleRequired && !requiredHierarchy) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user as Auth_Payload;

        if (!user) {
            throw new ForbiddenException('User not authenticated');
        }

        if (user.user_type === 'super_admin') {
            return true;
        }

        if (user.user_type === 'user') {
            const hasRole = !roleRequired || roleRequired.includes(user.role);
            const hasClass = !requiredHierarchy || requiredHierarchy.includes(user.class);

            if (!hasRole || !hasClass) {
                throw new ForbiddenException('Insufficient permissions');
            }

            return true;
        }

        throw new ForbiddenException('Invalid user type');
    }
}