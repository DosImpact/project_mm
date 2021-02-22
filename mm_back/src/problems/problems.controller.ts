import { Controller, Get } from '@nestjs/common';
import { ProblemsService } from './problems.service';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get()
  getAllProblems01() {
    return "getAllProblems01"
  }
}
