import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1 })
  page: number;
}

@ObjectType()
export class PaginationOutput {
  @Field((type) => Boolean, { defaultValue: false })
  ok!: boolean;

  @Field((type) => String, { nullable: true })
  error?: string;

  @Field((type) => Int)
  totalPage: number;

  @Field((type) => Int)
  totalEntity: number;
}
