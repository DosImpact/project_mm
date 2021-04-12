import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OHLCVL } from './dtos/OHLCVL.dto';

@Module({
  imports: [TypeOrmModule.forFeature([OHLCVL])],
  providers: [],
  controllers: [],
})
export class FinanceModule {}
