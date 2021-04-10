import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';

@Entity()
@InputType({ isAbstract: true })
@ObjectType()
export class HomeBanner extends CoreEntity {
  @IsString()
  @Field(() => String)
  @Column({ unique: true })
  name: string;

  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  @Column()
  images?: string[];
}
