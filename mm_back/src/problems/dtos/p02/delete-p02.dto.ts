import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteProblem02Input {
  @IsNumber()
  @Field((types) => Int)
  id: number;
}

@ObjectType()
export class DeleteProblem02Output extends CoreOutput {}
