import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

@Processor('todo')
export class TodoProcessor {
  private readonly logger = new Logger(TodoProcessor.name);

  @Process('doit')
  async handleJobs(job: Job) {
    this.logger.debug('[todo] doit start ....');
    await sleep(500);
    this.logger.debug('[todo] doit end ✔');
  }
}
