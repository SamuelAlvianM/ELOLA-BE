import { SetMetadata } from '@nestjs/common';
import { has_role, hierarchy } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: has_role[]) => SetMetadata(ROLES_KEY, roles);

export const CLASS_KEY = 'hierarchy';
export const Class = (...classes: hierarchy[]) => SetMetadata(CLASS_KEY, classes);
