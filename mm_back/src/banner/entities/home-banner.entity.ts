import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';

@InputType('BannerItemInput', { isAbstract: true })
@ObjectType()
export class BannerItem {
  @Field(() => String)
  src: string; // base_url + key

  @Field(() => String)
  base_url: string; // aws path

  @Field(() => String)
  key: string; // folder + file name
}

@Entity()
@InputType('HomeBannerInput', { isAbstract: true })
@ObjectType()
export class HomeBanner extends CoreEntity {
  @IsString()
  @Field(() => String)
  @Column()
  bucketName: string;

  @IsString()
  @Field(() => String)
  @Column({ unique: true })
  bannerName: string;

  @IsNumber()
  @Field(() => Int)
  @Column()
  bannerSize: number;

  @Field(() => [BannerItem], { nullable: true })
  @Column({ type: 'json', nullable: true })
  images?: BannerItem[];
}
