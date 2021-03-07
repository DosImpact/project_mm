import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CheckProblem01Input {
  @IsNumber()
  @Field(() => Int)
  id: number;

  @IsString({ each: true })
  @Field(() => [String])
  answer: string[];
}

@ObjectType()
export class CheckProblem01Output extends CoreOutput {
  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  isCorrect?: boolean;
}
