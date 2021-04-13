import { Controller, Get } from '@nestjs/common';
import { ProcessorService } from './processor.service';

@Controller('processor')
export class ProcessorController {
  constructor(private readonly processorService: ProcessorService) {}

  @Get('counterUp')
  async counterUp() {
    this.processorService.counterUp();
    return 'ok [counterUp]';
  }

  @Get('counterDown')
  async counterDown() {
    this.processorService.counterDown();
    return 'ok [counterDown]';
  }
}
