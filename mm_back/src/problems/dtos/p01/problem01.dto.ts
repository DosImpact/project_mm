import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Problem01 } from 'src/problems/entities/problem01.entity';

@InputType()
export class Problem01Input {
  @IsNumber()
  @Field(() => Int)
  id: number;
}

@ObjectType()
export class Problem01Output extends CoreOutput {
  @Field(() => Problem01, { nullable: true })
  problem01?: Problem01;
}
