import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './googleStrategy.service';

@Module({
  providers: [
    {
      provide: APP_GUARD, // nestJS가 제공하는 constant로 제공할것.
      useClass: AuthGuard,
    },
    GoogleStrategy,
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
