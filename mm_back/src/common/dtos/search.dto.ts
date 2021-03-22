import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class SearchInput {
  @IsString()
  @Field(() => String)
  term: string;

  @IsNumber()
  @Field(() => Int, { defaultValue: 1, nullable: true })
  page?: number;
}

@ObjectType()
export class SearchOutput {
  @Field((type) => Boolean, { defaultValue: false })
  ok!: boolean;

  @Field((type) => String, { nullable: true })
  error?: string;

  @Field((type) => Int)
  totalPage: number;

  @Field((type) => Int)
  totalEntity: number;
}
