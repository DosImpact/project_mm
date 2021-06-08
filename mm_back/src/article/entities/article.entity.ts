import { CoreEntity } from '@/common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
@InputType('ArticleInput', { isAbstract: true })
@ObjectType()
export class Article extends CoreEntity {
  @IsString()
  @Field(() => String)
  @Column()
  author: string;

  @IsString()
  @Field(() => String)
  @Column()
  content: string;
}
