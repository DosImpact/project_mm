import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { join } from 'path';
import { Problem02MiddleWare } from './jwt/jwt.middleware';
import { JwtModule } from './jwt/jwt.module';
import { Problem01 } from './problems/entities/problem01.entity';
import { Problem02 } from './problems/entities/problem02.entity';
import { ProblemsModule } from './problems/problems.module';
import { PyShellModule } from './pyshell/py-shell.module';
import { Profile } from './users/entities/profile.entity';
import { User } from './users/entities/user.entity';
import { Verification } from './users/entities/verification.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'test', 'production'),
        MAINTAINER: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().required(),
        JWT_KEY: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      url: process.env.DATABASE_URL,
      synchronize: process.env.NODE_ENV === 'dev' ? true : false,
      logging: false,
      entities: [User, Profile, Verification, Problem01, Problem02],
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      introspection: true, //apollo API 스키마 fetch가능
      playground: true, // 실서버 -> off
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // 생성된 schema 파일 확인 요망
      sortSchema: true, // 정렬
      context: ({ req }) => {
        console.log('GraphQLModule context checkin');
        // req에서 꺼내서 표면에 올린다.
        // context { req:{ problem02:{...}, ...} } => context { req:{...}, problem02:{...} }
        return { problem02: req['problem02'] };
      },
    }),
    JwtModule.forRoot({ privateKey: process.env.JWT_KEY }),
    PyShellModule.forRoot({
      mode: 'text',
      pythonPath: process.env.PYTHON_PATH,
      pythonOptions: ['-u'], // get print results in real-time
      scriptPath: 'py',
    }),
    UsersModule,
    ProblemsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Problem02MiddleWare).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
