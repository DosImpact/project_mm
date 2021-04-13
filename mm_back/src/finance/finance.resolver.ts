import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  CollectOHLCV_DBInput,
  CollectOHLCV_DBOutput,
} from './dtos/collect.dtos';
import { FinanceService } from './finance.service';

@Resolver()
export class FinanceResolver {
  constructor(private readonly financeService: FinanceService) {}

  @Mutation((returns) => CollectOHLCV_DBOutput)
  async produceCollectOHLCV_DB(
    @Args('input') collectOHLCV_DBInput: CollectOHLCV_DBInput,
  ) {
    return this.financeService.produceCollectOHLCV_DB(collectOHLCV_DBInput);
  }
}
