import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class ProducerService {
  constructor(
    @InjectQueue('python')
    private readonly pythonQ: Queue,
    @InjectQueue('todo')
    private readonly todoQ: Queue,
    @InjectQueue('counter')
    private readonly counterQ: Queue,
  ) {}

  async counterUp() {
    this.counterQ.add('up', { diff: 2 }, { timeout: 60 * 1000 });
  }
  async counterDown() {
    this.counterQ.add('down', { diff: 3 }, { timeout: 60 * 1000 });
  }

  async addTodo() {}
  async delTodo() {}
}
