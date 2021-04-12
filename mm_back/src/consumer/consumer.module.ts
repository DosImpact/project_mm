import { OHLCVL } from '@/finance/dtos/OHLCVL.dto';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { ProcessorModule } from './processor.module';

// MSA - 2 consumer
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
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
      }),
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        ...(process.env.REDIS_PASSWORD && {
          password: process.env.REDIS_PASSWORD,
        }),
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      url: process.env.DATABASE_URL,
      synchronize: false,
      logging: false,
      entities: [OHLCVL],
    }),
    ProcessorModule,
  ],
})
export class ConsumerModule {}
