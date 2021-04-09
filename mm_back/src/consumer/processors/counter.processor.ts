import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { CounterDownJob, CounterUpJob } from '../jobs.interface';

@Processor('counter')
export class CounterProcessor {
  cnt: number;
  constructor() {
    this.cnt = 0;
  }
  private readonly logger = new Logger(CounterProcessor.name);

  @Process('up')
  async counterUp(job: Job) {
    const data: CounterUpJob = job.data;
    this.cnt += data.diff;
    this.logger.debug(`counter : ${this.cnt}`);
  }

  @Process('down')
  async counterDown(job: Job) {
    const data: CounterDownJob = job.data;
    this.cnt -= data.diff;
    this.logger.debug(`counter : ${this.cnt}`);
  }
}
