import { BullModule } from '@nestjs/bull';
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
import { CommonModule } from './common/common.module';
import { JwtMiddleWare, Problem02MiddleWare } from './jwt/jwt.middleware';
import { JwtModule } from './jwt/jwt.module';
import { Note } from './nusers/note.entity';
import { NoteModule } from './nusers/note.module';
import { NUser } from './nusers/nuser.entity';
import { SharedNote } from './nusers/sharedNote.entity';
import { Problem01 } from './problems/entities/problem01.entity';
import { Problem02 } from './problems/entities/problem02.entity';
import { ProblemsModule } from './problems/problems.module';
import { PubsubModule } from './pubsub/pubsub.module';
import { PyTask } from './pyshell/entities/py-task.dto';
import { PyShellModule } from './pyshell/py-shell.module';
import { Profile } from './users/entities/profile.entity';
import { User } from './users/entities/user.entity';
import { Verification } from './users/entities/verification.entity';
import { UsersModule } from './users/users.module';
import { UploadsModule } from './uploads/uploads.module';
import { BannersModule } from './banner/banners.module';
import { Banner } from './banner/entities/banner.entity';
import { AuthModule } from './auth/auth.module';
import { OHLCV } from './finance/entities/OHLCV.entity';
import { FinanceModule } from './finance/finance.module';

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
        DATABASE_IS_SSL: Joi.string().default('Y'),
        PORT: Joi.number().required(),
        JWT_KEY: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        AWS_S3_BUCKET_NAME: Joi.string(),
        AWS_S3_ACCESS_KEY: Joi.string(),
        AWS_S3_SECRET_ACCESS_KEY: Joi.string(),
      }),
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        ...(process.env.REDIS_PASSWORD && {
          password: process.env.REDIS_PASSWORD,
        }),
        tls: {
          rejectUnauthorized: false,
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(process.env.DATABASE_IS_SSL === 'Y' && {
        ssl: {
          rejectUnauthorized: true,
        },
      }),
      url: process.env.DATABASE_URL,
      synchronize: process.env.NODE_ENV === 'dev' ? true : false,
      logging: false,
      entities: [
        User,
        Profile,
        Verification,
        PyTask,
        Problem01,
        Problem02,
        Note,
        SharedNote,
        NUser,
        Banner,
        OHLCV,
      ],
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      introspection: true, //apollo API 스키마 fetch가능
      playground: true, // 실서버 -> off
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // 생성된 schema 파일 확인 요망
      sortSchema: true, // 정렬
      context: ({ req }) => {
        // console.log('GraphQLModule context checkin', req['user']);
        // req에서 꺼내서 표면에 올린다.
        // context { req:{ user:{...}, ...} } => context { req:{...}, user:{...} }
        return { user: req['user'] };
      },
    }),
    CommonModule,
    PubsubModule.forRoot({
      redis_host: process.env.REDIS_HOST,
      redis_port: +process.env.REDIS_PORT,
      redis_password: process.env.REDIS_PASSWORD,
    }),
    JwtModule.forRoot({ privateKey: process.env.JWT_KEY }),
    PyShellModule.forRoot({
      mode: 'text',
      pythonPath: process.env.PYTHON_PATH,
      pythonOptions: ['-u'], // get print results in real-time
      scriptPath: 'py',
    }),
    AuthModule,
    UsersModule,
    ProblemsModule,
    NoteModule,
    UploadsModule,
    BannersModule,
    FinanceModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleWare, Problem02MiddleWare).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
