import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateArticleInput,
  CreateArticleOutput,
} from './dtos/mutation-article.dtos';
import { GetArticlesInput, GetArticlesOutput } from './dtos/query-article.dtos';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepo: Repository<Article>,
  ) {}

  async createArticle({
    author,
    content,
  }: CreateArticleInput): Promise<CreateArticleOutput> {
    try {
      await this.articleRepo.save(this.articleRepo.create({ author, content }));
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'cannot create article',
      };
    }
  }
  async getArticles(
    getArticlesInput: GetArticlesInput,
  ): Promise<GetArticlesOutput> {
    try {
      const articles = await this.articleRepo.find({});
      return {
        ok: true,
        articles,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'cannot get getArticles',
      };
    }
  }
}
