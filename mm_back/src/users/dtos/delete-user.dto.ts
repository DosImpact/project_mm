import { CoreOutput } from '@/common/dtos/output.dto';
import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.dto';

@InputType()
export class DeleteUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  id: string;
}

@ObjectType()
export class DeleteUserOutput extends CoreOutput {}
