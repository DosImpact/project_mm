import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CounterProcessor } from './processors/counter.processor';
import { TodoProcessor } from './processors/todo.processor';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'todo',
    }),
    BullModule.registerQueue({
      name: 'python',
    }),
    BullModule.registerQueue({
      name: 'counter',
    }),
  ],
  providers: [ProducerService, TodoProcessor, CounterProcessor],
  controllers: [ProducerController],
})
export class ProcessorModule {}
