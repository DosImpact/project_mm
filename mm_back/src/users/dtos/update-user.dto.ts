import { CoreOutput } from '@/common/dtos/output.dto';
import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.dto';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  id: string;
}

@ObjectType()
export class UpdateUserOutput extends CoreOutput {}