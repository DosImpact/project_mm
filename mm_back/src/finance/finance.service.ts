import { PyShellService } from '@/pyshell/py-shell.service';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Repository } from 'typeorm';
import {
  CollectOHLCV_DBInput,
  CollectOHLCV_DBOutput,
} from './dtos/collect.dtos';
import { PandasOHLCV } from './dtos/py.interfaces';
import { OHLCV } from './entities/OHLCV.entity';

const toDateNumber = (ms) => {
  const d = new Date(ms);
  return Number(d.toJSON().substr(0, 10).split('-').join(''));
};

@Injectable()
export class FinanceService {
  private readonly logger = new Logger(FinanceService.name);

  constructor(
    private readonly pyShellService: PyShellService,
    @InjectRepository(OHLCV)
    private readonly OHLCVRepo: Repository<OHLCV>,
    @InjectQueue('finance')
    private readonly financeQ: Queue,
  ) {
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
                code: Number(code),
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

  // get ohlcv from python
  // eg) 005930,1990-01-02,2050-01-01
  async collectOHLCV_DB({
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
                code: Number(code),
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
    } catch (error) {}
  }

  async produceCollectOHLCV_DB(
    collectOHLCV_DBInput: CollectOHLCV_DBInput,
  ): Promise<CollectOHLCV_DBOutput> {
    try {
      const job = await this.financeQ.add('collectOHLCV', collectOHLCV_DBInput);
      console.log(job);
    } catch (error) {
      this.logger.error(error);
      return { ok: false };
    }
  }
}
