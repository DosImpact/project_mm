import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  CheckProblem01Input,
  CheckProblem01Output,
} from './dtos/p01/check-problem01.dto';
import {
  CreateProblem01Input,
  CreateProblem01Output,
} from './dtos/p01/create-problem01.dto';
import {
  DeleteProblem01Input,
  DeleteProblem01Output,
} from './dtos/p01/delete-problem01.dto';
import { Problem01Input, Problem01Output } from './dtos/p01/problem01.dto';
import { Problems01Output } from './dtos/p01/problems01.dto';
import {
  UpdateProblem01Input,
  UpdateProblem01Output,
} from './dtos/p01/update-problem01.dto';
import {
  CreateProblem02Input,
  CreateProblem02Output,
} from './dtos/p02/create-p02.dto';
import {
  DeleteProblem02Input,
  DeleteProblem02Output,
} from './dtos/p02/delete-p02.dto';
import {
  LoginProblem02Input,
  LoginProblem02Output,
} from './dtos/p02/login-p02.dto';
import { Problem02Input, Problem02Output } from './dtos/p02/p02.dto';
import { Problems02Input, Problems02Output } from './dtos/p02/ps02.dto';
import {
  UpdateProblem02Input,
  UpdateProblem02Output,
} from './dtos/p02/update-p02.dto';
import { Problem01 } from './entities/problem01.entity';
import { Problem02 } from './entities/problem02.entity';
import { AuthProblem02 } from './problems.decorator';
import { ProblemsService } from './problems.service';

@Resolver((of) => Problem01)
export class Problem01Resolver {
  constructor(private readonly problemsService: ProblemsService) {}

  @ResolveField((returns) => Int)
  totalProblems01(@Parent() problem01: Problem01) {
    return this.problemsService.countProblem01();
  }

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

@Resolver((of) => Problem02)
export class Problem02Resolver {
  constructor(private readonly problemsService: ProblemsService) {}
  // @Query
  @Query((returns) => Problem02Output)
  getProblem02(@Args('input') problem02Input: Problem02Input) {
    return this.problemsService.getProblem02(problem02Input);
  }
  @Query((returns) => Problems02Output)
  getProblems02(@AuthProblem02() problem02: Problem02) {
    console.log('getProblems02 context: check in ');
    // @Context() context,
    // console.log(context['problem02'],);

    return this.problemsService.getProblems02();
  }
  // @Mutation

  @Mutation((returns) => CreateProblem02Output)
  createProblem02(@Args('input') createProblem02Input: CreateProblem02Input) {
    return this.problemsService.createProblem02(createProblem02Input);
  }

  @Mutation((returns) => UpdateProblem02Output)
  UpdateProblem02(@Args('input') updateProblem02Input: UpdateProblem02Input) {
    return this.problemsService.updateProblem02(updateProblem02Input);
  }
  @Mutation((returns) => DeleteProblem02Output)
  DeleteProblem02(@Args('input') deleteProblem02Input: DeleteProblem02Input) {
    return this.problemsService.deleteProblem02(deleteProblem02Input);
  }
  @Mutation((returns) => LoginProblem02Output)
  LoginProblem02(@Args('input') lLoginProblem02Input: LoginProblem02Input) {
    return this.problemsService.loginProblem02(lLoginProblem02Input);
  }
}
