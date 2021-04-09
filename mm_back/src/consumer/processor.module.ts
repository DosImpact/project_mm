import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CounterProcessor } from './processors/counter.processor';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'python',
    }),
    BullModule.registerQueue({
      name: 'counter',
    }),
  ],
  providers: [ProducerService, CounterProcessor],
  controllers: [ProducerController],
})
export class ProcessorModule {}
