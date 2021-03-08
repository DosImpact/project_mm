import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Problem02 } from 'src/problems/entities/problem02.entity';

@InputType()
export class Problem02Input {
  @IsNumber()
  @Field((types) => Int)
  id: number;
}

@ObjectType()
export class Problem02Output extends CoreOutput {
  @Field((types) => Problem02)
  problem02: Problem02;
}
