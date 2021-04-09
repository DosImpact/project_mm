import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Inject, Post } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('audio')
export class AudioController {
  counter: number;

  constructor(
    @InjectQueue('audio')
    private readonly audioQueue: Queue,
    @InjectQueue('todo')
    private readonly todoQueue: Queue,
  ) {
    this.counter = 0;
  }

  @Get('addtodo')
  async addtodo() {
    console.log('add todo');
    await this.todoQueue.add(
      'doit',
      {
        message: 'hello',
      },
      { timeout: 60000 * 10 },
    );
    return 'ok';
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
