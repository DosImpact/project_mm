import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Problem02 } from 'src/problems/entities/problem02.entity';

@InputType()
export class Problems02Input {}

@ObjectType()
export class Problems02Output extends CoreOutput {
  @Field((types) => [Problem02])
  problems02: Problem02[];
}
