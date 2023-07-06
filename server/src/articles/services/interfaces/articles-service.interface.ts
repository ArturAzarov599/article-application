import { ArticleEntity } from '@entities/article.entity';

import { ArticleDto } from '@articles/dtos/article.dto';
import { GetArticlesDto } from '@articles/dtos/get-articles.dto';
import { CreateArticleDto } from '@articles/dtos/create-article.dto';
import { GetAllArticlesDto } from '@articles/dtos/get-all-articles.dto';

export interface IArticleService {
  get(dto: GetArticlesDto): Promise<GetAllArticlesDto>;
  create(dto: CreateArticleDto): Promise<ArticleEntity>;
  delete(id: string): Promise<ArticleEntity>;
  update(dto: Partial<ArticleDto>): Promise<ArticleEntity>;
  fetchArticles(): Promise<void>;
}
