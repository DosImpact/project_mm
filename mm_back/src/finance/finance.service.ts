import { PyShellService } from '@/pyshell/py-shell.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PandasOHLCV } from './dtos/py.interfaces';
import { OHLCV } from './entities/OHLCV.entity';

@Injectable()
export class FinanceService {
  constructor(
    private readonly pyShellService: PyShellService,
    @InjectRepository(OHLCV)
    private readonly OHLCVRepo: Repository<OHLCV>,
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
    main();
  }

  // get ohlcv from python
  async getOHLCV() {}
}
