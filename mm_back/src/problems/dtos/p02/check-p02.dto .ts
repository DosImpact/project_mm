import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Problem02 } from 'src/problems/entities/problem02.entity';

@InputType()
export class CheckProblem02Input {
  @Field(() => Problem02)
  problem02: Problem02;
}

@ObjectType()
export class CheckProblem02Output extends CoreOutput {
  @Field(() => String, { nullable: true })
  flag?: string;
}
