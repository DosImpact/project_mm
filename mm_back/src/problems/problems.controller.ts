import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CheckProblem01Input } from './dtos/p01/check-problem01.dto';
import { CreateProblem01Input } from './dtos/p01/create-problem01.dto';
import { DeleteProblem01Input } from './dtos/p01/delete-problem01.dto';
import { UpdateProblem01Input } from './dtos/p01/update-problem01.dto';
import { ProblemsService } from './problems.service';

@Controller('problems01')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Get()
  getAllProblems01() {
    return this.problemsService.getProblems01();
  }
  @Get('/:id')
  getAllProblem01(@Param('id') id: number) {
    return this.problemsService.getProblem01({ id });
  }
  @Post('/check')
  checkProblem01(@Body() checkProblem01Input: CheckProblem01Input) {
    return this.problemsService.checkProblem01(checkProblem01Input);
  }
  @Post('/create')
  createProblem01(@Body() createProblem01Input: CreateProblem01Input) {
    return this.problemsService.createProblem01(createProblem01Input);
  }
  @Post('/update')
  updateProblem01(@Body() updateProblem01Input: UpdateProblem01Input) {
    return this.problemsService.updateProblem01(updateProblem01Input);
  }
  @Post('/delete')
  deleteProblem01(@Body() deleteProblem01Input: DeleteProblem01Input) {
    return this.problemsService.deleteProblem01(deleteProblem01Input);
  }
}
