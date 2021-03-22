import { CoreOutput } from '@/common/dtos/output.dto';
import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { UpdateProfileInput } from './mutations-profile.dtos';

@InputType()
export class CreateUserInput extends PickType(User, ['email', 'password']) {
  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => UpdateProfileInput, { nullable: true })
  profile: UpdateProfileInput;
}

@ObjectType()
export class CreateUserOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
export class DeleteUserInput {
  @Field(() => String)
  id: string;
}

@ObjectType()
export class DeleteUserOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  id: string;
}

@ObjectType()
export class UpdateUserOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
