import { Controller, Get, Param } from '@nestjs/common';
import { FinanceService, IOHLCV } from './finance.service';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('tickers')
  async getTicker() {
    return this.financeService.getTickers();
  }

  @Get('ticker/ohlcv/:symbol')
  async getTickerOHLCV(@Param('symbol') symbol: string): Promise<IOHLCV> {
    console.log(symbol);
    return this.financeService.getTickerOHLCV(symbol);
  }
}
