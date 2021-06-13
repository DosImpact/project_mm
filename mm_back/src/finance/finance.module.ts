import { BullModule } from '@nestjs/bull';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OHLCV } from './entities/OHLCV.entity';
import { FinanceResolver } from './finance.resolver';
import { FinanceService } from './finance.service';
import * as redisStore from 'cache-manager-redis-store';
import { Ticker } from './entities/ticker.entity';
import { FinanceController } from './finance.controller';
import { SP500OHLCV } from './entities/SP500OHLCV.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OHLCV, SP500OHLCV, Ticker]),
    BullModule.registerQueue({
      name: 'finance',
    }),
    BullModule.registerQueue({
      name: 'counter',
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        password: configService.get('REDIS_PASSWORD'),
        ttl: configService.get('CACHE_TTL'),
      }),
    }),
  ],
  providers: [FinanceService, FinanceResolver],
  controllers: [FinanceController],
  exports: [FinanceService],
})
export class FinanceModule {}
