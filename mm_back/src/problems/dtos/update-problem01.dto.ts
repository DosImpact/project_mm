import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Problem01 } from '../entities/problem01.entity';
import { CreateProblem01Input } from './create-problem01.dto';

@InputType()
export class UpdateProblem01Input extends PartialType(CreateProblem01Input) {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class UpdateProblem01Output extends CoreOutput {
  @Field(() => Problem01, { nullable: true })
  problem01?: Problem01;
}
