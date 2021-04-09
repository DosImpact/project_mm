import { Controller, Get } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Get('counterUp')
  async counterUp() {
    this.producerService.counterUp();
    return 'ok [counterUp]';
  }

  @Get('counterDown')
  async counterDown() {
    this.producerService.counterDown();
    return 'ok [counterDown]';
  }
}
