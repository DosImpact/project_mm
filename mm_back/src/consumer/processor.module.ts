import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CounterProcessor } from './processors/counter.processor';
import { ProcessorController } from './processor.controller';
import { ProcessorService } from './processor.service';

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
  ],
  providers: [ProcessorService, CounterProcessor],
  controllers: [ProcessorController],
})
export class ProcessorModule {}
