import { CoreOutput } from '@/common/dtos/output.dto';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Banner, BannerItem } from '../entities/banner.entity';

@InputType()
export class BannerByNameInput {
  @IsString()
  @Field(() => String)
  bannerName: string;
}

@ObjectType()
export class BannerByNameOutput extends CoreOutput {
  @Field(() => Banner, { nullable: true })
  banner?: Banner;
}

@InputType()
export class DeleteBannerInput {
  @IsString()
  @Field(() => String)
  bannerName: string;
}

@ObjectType()
export class DeleteBannerOutput extends CoreOutput {}
