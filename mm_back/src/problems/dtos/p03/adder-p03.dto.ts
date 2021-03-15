import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class AdderProblem03Input {
  @IsString()
  @Field((types) => String)
  filename: string;

  @IsString({ each: true })
  @Field((types) => [String], { nullable: true })
  args?: string[];

  @IsString({ each: true })
  @Field((types) => [String], { nullable: true })
  inputs?: string[];
}

@ObjectType()
export class AdderProblem03Output extends CoreOutput {
  @IsString({ each: true })
  @Field((types) => [String], { nullable: true })
  result?: string[];
}
