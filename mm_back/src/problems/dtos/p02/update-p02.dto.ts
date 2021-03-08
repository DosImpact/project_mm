import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreateProblem02Input } from './create-p02.dto';

@InputType()
export class UpdateProblem02Input extends PartialType(CreateProblem02Input) {
  @IsNumber()
  @Field((types) => Int)
  id: number;
}

@ObjectType()
export class UpdateProblem02Output extends CoreOutput {}
