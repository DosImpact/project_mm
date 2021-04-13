import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

@Processor('finance')
export class FinanceProcessor {
  private readonly logger = new Logger(FinanceProcessor.name);

  constructor() {}

  @Process('collectOHLCV')
  async collectOHLCV(job: Job) {}
}
