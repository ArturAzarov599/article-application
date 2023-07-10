import { Repository, ILike } from 'typeorm';
import { v4 as uuid4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { ArticleEntity } from '@entities/article.entity';

import { ArticleDto } from '@articles/dtos/article.dto';
import { GetArticlesDto } from '@articles/dtos/get-articles.dto';
import { CreateArticleDto } from '@articles/dtos/create-article.dto';
import { GetAllArticlesDto } from '@articles/dtos/get-all-articles.dto';

import { IArticlesRepository } from '@articles/repositories/interfaces/articles-repository.interface';

@Injectable()
export class ArticlesRepository implements IArticlesRepository {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articlesRepository: Repository<ArticleEntity>,
  ) {}

  get(id: string): Promise<ArticleEntity> {
    try {
      return this.articlesRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async getAll({
    limit: take,
    skip,
    title,
  }: GetArticlesDto): Promise<GetAllArticlesDto> {
    try {
      let articles: [ArticleEntity[], number] = [[], 0];

      if (title) {
        articles = await this.articlesRepository.findAndCount({
          where: { title: ILike(`%${title}%`) },
          skip,
          take,
          order: {
            publishDate: {
              direction: 'DESC',
            },
          },
        });
      } else {
        articles = await this.articlesRepository.findAndCount({
          skip,
          take,
          order: {
            publishDate: {
              direction: 'DESC',
            },
          },
        });
      }

      return {
        articles: articles[0],
        total: articles[1],
      };
    } catch (error) {
      throw error;
    }
  }

  create(dto: CreateArticleDto): Promise<ArticleEntity> {
    try {
      const id = uuid4();
      return this.articlesRepository.save({ id, ...dto });
    } catch (error) {
      throw error;
    }
  }

  update(dto: ArticleDto): Promise<ArticleEntity> {
    try {
      return this.articlesRepository.save(dto);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<ArticleEntity> {
    try {
      const article = await this.get(id);

      if (!article) {
        throw new NotFoundException('Can`t find article');
      }

      return this.articlesRepository.remove(article);
    } catch (error) {
      throw error;
    }
  }

  saveMany(articles: ArticleDto[]): Promise<ArticleEntity[]> {
    try {
      return this.articlesRepository.save(articles);
    } catch (error) {
      throw error;
    }
  }
}
