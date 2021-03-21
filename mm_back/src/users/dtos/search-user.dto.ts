import { SearchInput, SearchOutput } from '@/common/dtos/search.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class SearchUserInput extends SearchInput {}

@ObjectType()
export class SearchUserOutput extends SearchOutput {
  @Field((type) => [User])
  users: User[];
}
