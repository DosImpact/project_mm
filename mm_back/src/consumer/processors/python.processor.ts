import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

@Processor('python')
export class PythonProcessor {
  private readonly logger = new Logger(PythonProcessor.name);

  @Process('example')
  async exampleTask(job: Job) {
    this.logger.debug(`[example start]`);
    await sleep(500);
    this.logger.debug(`✔[example end]`);
  }

  // event-listeners 프로세스의 이벤트가 실행되면 정보 출력
  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `[onActive]Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  // event-listeners 프로세스의 이벤트가 종료  출력
  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(
      `[onCompleted]Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}
