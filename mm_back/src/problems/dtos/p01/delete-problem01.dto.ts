import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteProblem01Input {
  @IsNumber()
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class DeleteProblem01Output extends CoreOutput {}
