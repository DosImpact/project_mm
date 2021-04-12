import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OHLCV } from './entities/OHLCV.entity';
import { FinanceService } from './finance.service';

@Module({
  imports: [TypeOrmModule.forFeature([OHLCV])],
  providers: [FinanceService],
  controllers: [],
})
export class FinanceModule {}
