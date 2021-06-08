import { Body, Controller, Get, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleInput } from './dtos/mutation-article.dtos';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('/create')
  async createArticle(@Body() createArticleInput: CreateArticleInput) {
    return this.articleService.createArticle(createArticleInput);
  }

  @Get()
  async getArticles() {
    return this.articleService.getArticles({});
  }
}
