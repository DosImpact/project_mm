import { CoreOutput } from '@/common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Article } from '../entities/article.entity';

@InputType()
export class GetArticlesInput {}

@ObjectType()
export class GetArticlesOutput extends CoreOutput {
  @Field((type) => [Article], { nullable: true })
  articles?: Article[];
}
