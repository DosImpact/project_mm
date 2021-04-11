import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  providers: [
    {
      provide: APP_GUARD, // nestJS가 제공하는 constant로 제공할것.
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
