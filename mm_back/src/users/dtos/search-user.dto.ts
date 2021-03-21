import { CoreOutput } from '@/common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class SearchUserInput {
  @Field(() => String)
  terms: string;
}

@ObjectType()
export class SearchUserOutput extends CoreOutput {}
