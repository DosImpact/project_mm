import { CoreOutput } from '@/common/dtos/output.dto';
import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Article } from '../entities/article.entity';

@InputType()
export class CreateArticleInput extends PickType(Article, [
  'author',
  'content',
]) {}

@ObjectType()
export class CreateArticleOutput extends CoreOutput {}
