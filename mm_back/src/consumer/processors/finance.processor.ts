import { FinanceService } from '@/finance/finance.service';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { collectOHLCVJob } from '../jobs.interface';

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

@Processor('finance')
export class FinanceProcessor {
  private readonly logger = new Logger(FinanceProcessor.name);

  constructor(private readonly financeService: FinanceService) {}

  @Process('collectOHLCV')
  async collectOHLCV(job: Job) {
    const jobData: collectOHLCVJob = job.data;
    console.log('incomming jobData', jobData);
    await this.financeService.__collectOHLCV_DB(jobData);
  }
}
