import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CheckProblem01Input } from './dtos/p01/check-problem01.dto';
import { CreateProblem01Input } from './dtos/p01/create-problem01.dto';
import { DeleteProblem01Input } from './dtos/p01/delete-problem01.dto';
import { UpdateProblem01Input } from './dtos/p01/update-problem01.dto';
import { CreateProblem02Input } from './dtos/p02/create-p02.dto';
import { DeleteProblem02Input } from './dtos/p02/delete-p02.dto';
import { LoginProblem02Input } from './dtos/p02/login-p02.dto';
import { Problem02Input } from './dtos/p02/p02.dto';
import { UpdateProblem02Input } from './dtos/p02/update-p02.dto';
import { ProblemsService } from './problems.service';

@Controller('problems01')
export class Problem01Controller {
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

@Controller('problems02')
export class Problem02Controller {
  constructor(private readonly problemsService: ProblemsService) {}
  // @Query

  @Get()
  getProblems02() {
    return this.problemsService.getProblems02();
  }
  @Get('/:id')
  getProblem02(@Param('id') id: number) {
    return this.problemsService.getProblem02({ id });
  }
  // @Mutation
  @Post('/create')
  createProblem02(@Body() createProblem02Input: CreateProblem02Input) {
    return this.problemsService.createProblem02(createProblem02Input);
  }

  @Post('/update')
  UpdateProblem02(@Body() updateProblem02Input: UpdateProblem02Input) {
    return this.problemsService.updateProblem02(updateProblem02Input);
  }
  @Post('/detete')
  DeleteProblem02(@Body() deleteProblem02Input: DeleteProblem02Input) {
    return this.problemsService.deleteProblem02(deleteProblem02Input);
  }
  @Post('/login')
  LoginProblem02(@Body() lLoginProblem02Input: LoginProblem02Input) {
    return this.problemsService.loginProblem02(lLoginProblem02Input);
  }
}
