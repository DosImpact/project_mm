import { UserRole } from '@/users/entities/user.entity';
import { SetMetadata } from '@nestjs/common';

export type AllowRoles = keyof typeof UserRole | 'Any';

export const Role = (roles: AllowRoles[]) => SetMetadata('roles', roles);
