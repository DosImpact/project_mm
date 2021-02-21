import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateProblem01Input,
  CreateProblem01Output,
} from './dtos/create-problem01.dto';
import { Problem01Input, Problem01Output } from './dtos/problem01.dto';
import { Problem01 } from './entities/problem01.entity';
import { ProblemsService } from './problems.service';

@Resolver((of) => Problem01)
export class ProblemsResolver {
  constructor(private readonly problemsService: ProblemsService) {}

  @Query((returns) => Problem01Output)
  getProblem01(@Args('problem01Input') problem01Input: Problem01Input) {
    return this.problemsService.getProblem01(problem01Input);
  }

  @Mutation((returns) => CreateProblem01Output)
  createProblem01(
    @Args('createProblem01Input') createProblem01Input: CreateProblem01Input,
  ) {
    return this.problemsService.createProblem01(createProblem01Input);
  }
}
