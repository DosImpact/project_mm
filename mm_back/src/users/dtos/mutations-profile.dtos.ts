import { CoreOutput } from '@/common/dtos/output.dto';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Profile } from '../entities/profile.entity';

@InputType()
export class UpdateProfileInput extends PickType(Profile, ['bio', 'user']) {}

@ObjectType()
export class UpdateProfileOutput extends CoreOutput {
  @Field(() => Profile, { nullable: true })
  profile?: Profile;
}
