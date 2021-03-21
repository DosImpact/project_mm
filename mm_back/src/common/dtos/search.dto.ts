import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class SearchInput {
  @Field(() => String)
  term: string;

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
