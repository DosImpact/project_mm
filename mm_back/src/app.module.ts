import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { join } from 'path';
import { Problem01 } from './problems/entities/problem01.entity';
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
      entities: [User, Problem01],
    }),
    GraphQLModule.forRoot({
      introspection: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    UsersModule,
    ProblemsModule,
  ],
})
export class AppModule {}
