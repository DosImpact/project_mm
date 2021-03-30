import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('audio')
export class AudioController {
  counter: number;

  constructor(@InjectQueue('audio') private readonly audioQueue: Queue) {
    this.counter = 0;
  }

  @Get('transcode')
  async transcode() {
    this.counter += 1;
    await this.audioQueue.add(
      'transcode',
      {
        file: `audio${this.counter}.mp3`,
      },
      { timeout: 60000 * 10 },
    );
    return `ok[${this.counter}]`;
  }
}
