import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CounterProcessor } from './processors/counter.processor';
import { ProcessorController } from './processor.controller';
import { ProcessorService } from './processor.service';
import { FinanceProcessor } from './processors/finance.processor';
import { FinanceModule } from '@/finance/finance.module';
import { FinanceService } from '@/finance/finance.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'python',
    }),
    BullModule.registerQueue({
      name: 'counter',
    }),
    BullModule.registerQueue({
      name: 'finance',
    }),
    FinanceModule,
  ],
  providers: [ProcessorService, CounterProcessor, FinanceProcessor],
  controllers: [ProcessorController],
})
export class ProcessorModule {}
