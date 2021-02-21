import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Problem01 } from '../entities/problem01.entity';

@ObjectType()
export class Problems01Output extends CoreOutput {
  @Field(() => [Problem01], { nullable: true })
  problems01?: Problem01[];
}
