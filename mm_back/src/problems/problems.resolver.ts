import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CheckProblem01Input,
  CheckProblem01Output,
} from './dtos/check-problem01.dto';
import {
  CreateProblem01Input,
  CreateProblem01Output,
} from './dtos/create-problem01.dto';
import {
  DeleteProblem01Input,
  DeleteProblem01Output,
} from './dtos/delete-problem01.dto';
import { Problem01Input, Problem01Output } from './dtos/problem01.dto';
import { Problems01Output } from './dtos/problems01.dto';
import {
  UpdateProblem01Input,
  UpdateProblem01Output,
} from './dtos/update-problem01.dto';
import { Problem01 } from './entities/problem01.entity';
import { ProblemsService } from './problems.service';

@Resolver((of) => Problem01)
export class ProblemsResolver {
  constructor(private readonly problemsService: ProblemsService) {}

  @Query((returns) => Problem01Output)
  getProblem01(@Args('problem01Input') problem01Input: Problem01Input) {
    return this.problemsService.getProblem01(problem01Input);
  }

  @Query((returns) => Problems01Output)
  getProblems01() {
    return this.problemsService.getProblems01();
  }
  @Mutation((returns) => CheckProblem01Output)
  checkProblem01(
    @Args('checkProblem01Input') checkProblem01Input: CheckProblem01Input,
  ) {
    return this.problemsService.checkProblem01(checkProblem01Input);
  }

  @Mutation((returns) => CreateProblem01Output)
  createProblem01(
    @Args('createProblem01Input') createProblem01Input: CreateProblem01Input,
  ) {
    return this.problemsService.createProblem01(createProblem01Input);
  }

  @Mutation((returns) => UpdateProblem01Output)
  UpdateProblem01(
    @Args('updateProblem01Input') updateProblem01Input: UpdateProblem01Input,
  ) {
    return this.problemsService.updateProblem01(updateProblem01Input);
  }
  @Mutation((returns) => DeleteProblem01Output)
  DeleteProblem01(
    @Args('deleteProblem01Input') deleteProblem01Input: DeleteProblem01Input,
  ) {
    return this.problemsService.deleteProblem01(deleteProblem01Input);
  }
}
