import { CoreOutput } from '@/common/dtos/output.dto';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Profile } from '../entities/profile.entity';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(User, ['email', 'password']) {
  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => Profile, { nullable: true })
  profile: Profile;
}

@ObjectType()
export class CreateUserOutput extends CoreOutput {}
