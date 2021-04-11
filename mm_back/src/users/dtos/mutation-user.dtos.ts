import { CoreOutput } from '@/common/dtos/output.dto';
import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { IsString, ValidateNested } from 'class-validator';
import { User } from '../entities/user.entity';
import { UpdateProfileInput } from './mutations-profile.dtos';

// 클래스 유효성이 없는 필드는 삭제된다.

@InputType()
export class CreateUserInput extends PickType(User, ['email', 'password']) {
  @IsString()
  @Field(() => String, { nullable: true })
  username?: string;
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
export class UpdateUserInput extends PartialType(CreateUserInput) {}

@ObjectType()
export class UpdateUserOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
export class LoginUserInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginUserOuput extends CoreOutput {
  @Field(() => String, { nullable: true })
  token?: string;
}
