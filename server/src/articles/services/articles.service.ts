import { Inject, Injectable } from '@nestjs/common';

import { ArticleDto } from '@articles/dtos/article.dto';
import { GetArticlesDto } from '@articles/dtos/get-articles.dto';
import { CreateArticleDto } from '@articles/dtos/create-article.dto';
import { GetAllArticlesDto } from '@articles/dtos/get-all-articles.dto';

import { IArticleService } from '@articles/services/interfaces/articles-service.interface';
import { IArticlesRepository } from '@articles/repositories/interfaces/articles-repository.interface';

import { ARTICLES_REPOSITORY_TOKEN } from 'src/injection-tokens';

@Injectable()
export class ArticlesService implements IArticleService {
  constructor(
    @Inject(ARTICLES_REPOSITORY_TOKEN)
    private readonly articlesRepository: IArticlesRepository,
  ) {}

  create(dto: CreateArticleDto): Promise<ArticleDto> {
    try {
      return this.articlesRepository.create(dto);
    } catch (error) {
      throw error;
    }
  }

  delete(id: string): Promise<ArticleDto> {
    try {
      return this.articlesRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  update(dto: Partial<ArticleDto>): Promise<ArticleDto> {
    try {
      return this.articlesRepository.update(dto);
    } catch (error) {
      throw error;
    }
  }

  get(dto: GetArticlesDto): Promise<GetAllArticlesDto> {
    try {
      return this.articlesRepository.getAll(dto);
    } catch (error) {
      throw error;
    }
  }
}
