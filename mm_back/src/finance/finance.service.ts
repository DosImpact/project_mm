import { PyShellService } from '@/pyshell/py-shell.service';
import { InjectQueue } from '@nestjs/bull';
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import {
  CollectOHLCV_DBInput,
  CollectOHLCV_DBOutput,
} from './dtos/collect.dtos';
import { PandasOHLCV } from './dtos/py.interfaces';
import { OHLCVByCodeInput, OHLCVByCodeOutput } from './dtos/query.dtos';
import { OHLCV } from './entities/OHLCV.entity';
import { Ticker } from './entities/ticker.entity';
import { ArrayUnique } from 'class-validator';
import { SP500OHLCV } from './entities/SP500OHLCV.entity';
import { date } from 'joi';

const toDateNumber = (ms) => {
  const d = new Date(ms);
  return Number(d.toJSON().substr(0, 10).split('-').join(''));
};

interface Indexer {
  [index: string]: string;
}
interface ITickers {
  Symbol: Indexer;
  Name: Indexer;
  Sector: Indexer;
  Industry: Indexer;
}

export interface IOHLCV {
  Date;
  Close: Indexer;
  Open: Indexer;
  High: Indexer;
  Low: Indexer;
  Volume: Indexer;
  Change: Indexer;
  SMA_3: Indexer;
  SMA_5: Indexer;
  SMA_10: Indexer;
  SMA_20: Indexer;
  MMT: Indexer;
  MMT_TARGE: Indexer;
}

@Injectable()
export class FinanceService {
  private readonly logger = new Logger(FinanceService.name);

  constructor(
    private readonly pyShellService: PyShellService,
    @InjectRepository(OHLCV)
    private readonly OHLCVRepo: Repository<OHLCV>,
    @InjectRepository(SP500OHLCV)
    private readonly SP500OHLCVRepo: Repository<SP500OHLCV>,
    @InjectRepository(Ticker)
    private readonly tickerRepo: Repository<Ticker>,
    @InjectQueue('finance')
    private readonly financeQ: Queue,
    @InjectQueue('counter')
    private readonly counterQ: Queue,
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {
    const test = async () => {
      // const tickers = await this.tickerRepo.find({});
      // tickers.slice(0, 1).map(async (ticker) => {
      //   const res: IOHLCV = await this.cache.get(`OHLCV_${ticker.symbol}`);
      //   if (res) {
      //     for (let i = 0; i < res['Date'].length; i++) {
      //       console.log(res);
      //       console.log(res['Date'][`${i}`]);
      //       break;
      //       // this.SP500OHLCVRepo.create({
      //       //   code: ticker.symbol
      //       //   date: ticker.
      //       // })
      //     }
      //   }
      // });
    };
    test();

    const main = async () => {
      const code = '005930';
      const { ok, error, result } = await this.pyShellService.exePy({
        filename: 'OHLCV.py',
        args: [code, '1990-01-02', '2050-01-01'],
      });
      console.log('----FinanceService---');
      if (ok && result[0] === '0') {
        const parsedData: PandasOHLCV = JSON.parse(result[1]);
        // console.log(parsedData);
        console.log(
          'total data',
          parsedData.data.length,
          parsedData.index.length,
        );

        const toDateNumber = (ms) => {
          const d = new Date(ms);
          return Number(d.toJSON().substr(0, 10).split('-').join(''));
        };

        await Promise.all(
          [...Array(parsedData.data.length).keys()].map(async (i) => {
            const [
              date,
              Open,
              High,
              Low,
              Close,
              Volume,
              Change,
            ] = parsedData.data[i];
            await this.OHLCVRepo.save(
              this.OHLCVRepo.create({
                code: code,
                date: toDateNumber(date),
                Open,
                High,
                Low,
                Close,
                Volume,
                Change,
              }),
            );
            console.log('✔', i, parsedData.data[i], toDateNumber(date));
          }),
        );

        // for (let i = 0; i < parsedData.data.length; i++) {
        //   const [
        //     date,
        //     Open,
        //     High,
        //     Low,
        //     Close,
        //     Volume,
        //     Change,
        //   ] = parsedData.data[i];

        //   console.log(i, parsedData.data[i], toDateNumber(date));

        //   await this.OHLCVRepo.save(
        //     this.OHLCVRepo.create({
        //       code: Number(code),
        //       date: toDateNumber(date),
        //       Open,
        //       High,
        //       Low,
        //       Close,
        //       Volume,
        //       Change,
        //     }),
        //   );

        // }
      }
    };
    // main();
  }

  async getOHLCVByCode({ code }: OHLCVByCodeInput): Promise<OHLCVByCodeOutput> {
    try {
      const OHLCVs = await this.OHLCVRepo.find({
        where: { code },
        order: { date: 'DESC' },
      });
      return {
        ok: true,
        OHLCVs,
        OHLCV_count: OHLCVs.length,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'cannot get getOHLCV',
      };
    }
  }

  // get ohlcv from python
  // eg) 005930,1990-01-02,2050-01-01
  // !import : excution runtime is very long
  async __collectOHLCV_DB({
    code,
    endDate,
    startDate,
  }: CollectOHLCV_DBInput): Promise<CollectOHLCV_DBOutput> {
    try {
      // data fetch from pyShell
      const { ok, error, result } = await this.pyShellService.exePy({
        filename: 'OHLCV.py',
        args: [code, startDate, endDate],
      });
      if (!ok) {
        this.logger.error(error);
        return { ok: false, error: 'cannot collectOHLCV_DB pyShell' };
      }
      // case - fetch success
      if (ok && result[0] === '0') {
        const parsedData: PandasOHLCV = JSON.parse(result[1]);

        this.logger.debug(
          `✔️ start collectOHLCV_DB[${code}] ${startDate}-${endDate} total : ${parsedData.data.length}`,
        );

        // async DB Insert
        await Promise.all(
          [...Array(parsedData.data.length).keys()].map(async (i) => {
            const [
              date,
              Open,
              High,
              Low,
              Close,
              Volume,
              Change,
            ] = parsedData.data[i];

            await this.OHLCVRepo.save(
              this.OHLCVRepo.create({
                code: code,
                date: toDateNumber(date),
                Open,
                High,
                Low,
                Close,
                Volume,
                Change,
              }),
            );
            // complete row
            this.logger.debug(
              `✔${i} ${parsedData.data[i]}, ${toDateNumber(date)}`,
            );
          }),
        );
      }
    } catch (error) {
      return { ok: false };
    }
  }

  // TODO 진행중인 job에 대해 상태 시작전,진행중,진행상황,종료,성공|실패 등등
  async produceCollectOHLCV_DB(
    collectOHLCV_DBInput: CollectOHLCV_DBInput,
  ): Promise<CollectOHLCV_DBOutput> {
    try {
      await this.financeQ.add('collectOHLCV', collectOHLCV_DBInput);
      return { ok: true };
    } catch (error) {
      this.logger.error(error);
      return { ok: false };
    }
  }

  async tickersRedisToDB() {
    const res: ITickers = await this.cache.get('S&P500');
    new Array(505).fill(0).map(async (_, i) => {
      // console.log(i);
      await this.tickerRepo.save(
        this.tickerRepo.create({
          symbol: res.Symbol[i],
          name: res.Name[i],
          sector: res.Sector[i],
          industry: res.Industry[i],
        }),
      );
    });
  }
  async getTickers() {
    return this.tickerRepo.find({});
  }

  async getTickerOHLCV(ticker_symbol: string) {
    try {
      const res: IOHLCV = await this.cache.get(`OHLCV_${ticker_symbol}`);
      return res;
    } catch (error) {}
  }
}
