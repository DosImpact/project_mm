import {
  OnQueueActive,
  OnQueueCompleted,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// audio 라는 큐 프로세서 생성
@Processor('audio')
export class AudioProcessor {
  private readonly logger = new Logger(AudioProcessor.name);

  @Process('transcode') // transcode 라는 job 이름 생성
  async handleTranscode(job: Job) {
    this.logger.debug('Start transcoding...');
    // progress 진행도 기록 가능
    let progress = 0;
    for (let i = 0; i < 100; i++) {
      await sleep(20);
      progress += 10;
      job.progress(progress);
    }
    this.logger.debug(job.data);
    this.logger.debug('Transcoding completed');
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
