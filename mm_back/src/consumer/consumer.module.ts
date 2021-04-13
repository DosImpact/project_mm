import { OHLCV } from '@/finance/entities/OHLCV.entity';
import { FinanceModule } from '@/finance/finance.module';
import { PyShellModule } from '@/pyshell/py-shell.module';
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
        DATABASE_IS_SSL: Joi.string().default('Y'),
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
      ...(process.env.DATABASE_IS_SSL === 'Y' && {
        ssl: {
          rejectUnauthorized: true,
        },
      }),
      url: process.env.DATABASE_URL,
      synchronize: false,
      logging: false,
      entities: [OHLCV],
    }),
    PyShellModule.forRoot({
      mode: 'text',
      pythonPath: process.env.PYTHON_PATH,
      pythonOptions: ['-u'], // get print results in real-time
      scriptPath: 'py',
    }),
    FinanceModule,
    ProcessorModule,
  ],
})
export class ConsumerModule {}
