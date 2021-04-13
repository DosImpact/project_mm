import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class ProcessorService {
  constructor(
    @InjectQueue('python')
    private readonly pythonQ: Queue,
    @InjectQueue('counter')
    private readonly counterQ: Queue,
  ) {}

  // TEST - producer Logic
  async counterUp() {
    this.counterQ.add('up', { diff: 2 }, { timeout: 60 * 1000 });
  }
  async counterDown() {
    this.counterQ.add('down', { diff: 3 }, { timeout: 60 * 1000 });
  }
  // TEST - producer Logic
  async addTodo() {}
  async delTodo() {}
  // TODO 큐 상태 관련 보고,삭제,모니터링 등등
}
