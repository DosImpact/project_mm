import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Problem02 } from 'src/problems/entities/problem02.entity';

@InputType()
export class CreateProblem02Input extends PickType(Problem02, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class CreateProblem02Output extends CoreOutput {}
