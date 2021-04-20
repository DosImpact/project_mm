import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CollectOHLCV_DBInput,
  CollectOHLCV_DBOutput,
} from './dtos/collect.dtos';
import { FinanceService } from './finance.service';
import { codes } from './constants';
import { OHLCVByCodeInput, OHLCVByCodeOutput } from './dtos/query.dtos';
@Resolver()
export class FinanceResolver {
  constructor(private readonly financeService: FinanceService) {
    const seed = async () => {
      console.log(codes);
      for (let i = 0; i < codes.length; i++) {
        console.log('====================================');
        console.log('codes ', i, 'start');
        // await this.financeService.produceCollectOHLCV_DB({
        //   code: codes[i],
        //   startDate: '1950-01-01',
        //   endDate: '2050-01-10',
        // });
        console.log('codes ', i, codes[i], 'end');
        console.log('====================================');
      }
    };
    // seed();
  }

  // Query Part

  @Query((returns) => OHLCVByCodeOutput)
  async getOHLCVByCode(@Args('input') _OHLCVByCodeInput: OHLCVByCodeInput) {
    return this.financeService.getOHLCVByCode(_OHLCVByCodeInput);
  }

  // Mutation Part
  @Mutation((returns) => CollectOHLCV_DBOutput)
  async produceCollectOHLCV_DB(
    @Args('input') collectOHLCV_DBInput: CollectOHLCV_DBInput,
  ) {
    return this.financeService.produceCollectOHLCV_DB(collectOHLCV_DBInput);
  }
}
