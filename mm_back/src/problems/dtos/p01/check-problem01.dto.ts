import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CheckProblem01Input {
  @Field(() => [String])
  @IsString({ each: true })
  answers: string[];
}

@ObjectType()
export class CheckProblem01Output extends CoreOutput {}
