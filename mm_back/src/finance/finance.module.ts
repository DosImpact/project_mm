import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OHLCV } from './entities/OHLCV.entity';
import { FinanceResolver } from './finance.resolver';
import { FinanceService } from './finance.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OHLCV]),
    BullModule.registerQueue({
      name: 'finance',
    }),
    BullModule.registerQueue({
      name: 'counter',
    }),
  ],
  providers: [FinanceService, FinanceResolver],
  controllers: [],
  exports: [FinanceService],
})
export class FinanceModule {}
