import { CoreOutput } from '@/common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateBannerInput {
  @IsString()
  @Field(() => String)
  bannerName: string;
}

@ObjectType()
export class CreateBannerOutput extends CoreOutput {}
