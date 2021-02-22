import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class DeleteProblem01Input {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class DeleteProblem01Output extends CoreOutput {}
