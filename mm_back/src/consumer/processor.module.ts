import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TodoProcessor } from './todo.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'todo',
    }),
  ],
  providers: [TodoProcessor],
})
export class ProcessorModule {}
