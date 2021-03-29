import { User } from '@/users/entities/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// request context에서 사용자 정보를 가져온다.
export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    //  contextType === http
    if (
      context['contextType'] &&
      String(context['contextType']).startsWith('http')
    ) {
      const request = context.switchToHttp().getRequest();
      return request['user'];
    }
    // contextType === graphql

    if (
      context['contextType'] &&
      String(context['contextType']).startsWith('graphql')
    ) {
      const gqlContext = GqlExecutionContext.create(context).getContext();
      return gqlContext['user'];
    }
  },
);
