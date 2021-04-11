import { User, UserRole } from '@/users/entities/user.entity';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AllowRoles } from './role.decorator';

// TODO wss 때문에 여기서 jwt resolver 진행
// TODO enum type 상하위 호환인데, toString으로 해결했음...
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowRoles[]>(
      'roles',
      context.getHandler(),
    );

    // public - no need jwt
    if (!roles) return true;

    // private - need jwt
    const rolestr = roles.toString();
    const gqlContenxt = GqlExecutionContext.create(context).getContext();
    const user: User = gqlContenxt['user'];
    if (!user) return false; // JWT 가 없는 경우

    if (roles.includes('Any')) return true; // JWT 있고 & Any
    if (rolestr.includes(user.role)) return true; // JWT 있고 & Role 일치

    return false; // JWT 있고 & Role 불일치
  }
}
