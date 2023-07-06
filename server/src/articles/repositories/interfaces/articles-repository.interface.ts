import { ArticleEntity } from '@entities/article.entity';

import { ArticleDto } from '@articles/dtos/article.dto';
import { GetArticlesDto } from '@articles/dtos/get-articles.dto';
import { CreateArticleDto } from '@articles/dtos/create-article.dto';
import { GetAllArticlesDto } from '@articles/dtos/get-all-articles.dto';

export interface IArticlesRepository {
  get(id: string): Promise<ArticleEntity>;
  getAll(dto: GetArticlesDto): Promise<GetAllArticlesDto>;
  create(dto: CreateArticleDto): Promise<ArticleEntity>;
  update(dto: Partial<ArticleDto>): Promise<ArticleEntity>;
  delete(id: string): Promise<ArticleEntity>;
  saveMany(articles: ArticleEntity[]): Promise<ArticleEntity[]>;
}
