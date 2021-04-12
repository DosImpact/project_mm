import { CoreOutput } from '@/common/dtos/output.dto';
import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Profile } from '../entities/profile.entity';

// 프로필 업데이트 , 어떤 유저인지 ( id,User객체? )
@InputType()
export class UpdateProfileInput extends PartialType(
  PickType(Profile, ['bio'] as const), // TODO const assertion 을 사용 ?? - 이유 파악
) {
  @IsString()
  @Field(() => String)
  email: string;
}

@ObjectType()
export class UpdateProfileOutput extends CoreOutput {
  @Field(() => Profile, { nullable: true })
  profile?: Profile;
}
