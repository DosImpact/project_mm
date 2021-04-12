import { CoreOutput } from '@/common/dtos/output.dto';
import { SearchPageInput, SearchPageOutput } from '@/common/dtos/search-page';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

// 다수의 유저 검색 ( 이메일, 아이디 )

@InputType()
export class SearchUserByEmailInput extends SearchPageInput {}

@ObjectType()
export class SearchUserByEmailOutput extends SearchPageOutput {
  @Field((type) => [User], { nullable: true })
  users?: User[];
}

// 아이디로 특정 유저 검색

@InputType()
export class GetUserByIdInput {
  @IsString()
  @Field((type) => String)
  id: string;
}

@ObjectType()
export class GetUserByIdOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}

// 이메일로 특정 유저 검색

@InputType()
export class GetUserByEmailInput {
  @IsEmail()
  @Field((type) => String)
  email: string;
}

@ObjectType()
export class GetUserByEmailOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  user?: User;
}
