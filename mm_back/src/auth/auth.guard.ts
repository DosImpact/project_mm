import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

// 인증,권한을 확인해서 리퀘스트 접근 여부를 판단
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    return true;
  }
}
