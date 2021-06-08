import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import {
  CreateArticleInput,
  CreateArticleOutput,
} from './dtos/mutation-article.dtos';
import { GetArticlesOutput } from './dtos/query-article.dtos';

@Resolver()
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation((returns) => CreateArticleOutput)
  async createArticle(@Args('input') createArticleInput: CreateArticleInput) {
    return this.articleService.createArticle(createArticleInput);
  }

  @Query((returns) => GetArticlesOutput)
  async getArticles() {
    return this.articleService.getArticles({});
  }
}
