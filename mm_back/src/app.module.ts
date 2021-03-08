import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { join } from 'path';
import { JwtModule } from './jwt/jwt.module';
import { Problem01 } from './problems/entities/problem01.entity';
import { Problem02 } from './problems/entities/problem02.entity';
import { ProblemsModule } from './problems/problems.module';
import { User } from './users/entities/user.entity';
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
      entities: [User, Problem01, Problem02],
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      introspection: true, //apollo API 스키마 fetch가능
      playground: true, // 실서버 -> off
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // 생성된 schema 파일 확인 요망
      sortSchema: true, // 정렬
    }),
    JwtModule.forRoot({ privateKey: process.env.JWT_KEY }),
    UsersModule,
    ProblemsModule,
  ],
})
export class AppModule {}
