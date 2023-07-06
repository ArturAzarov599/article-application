import { Repository, ILike } from 'typeorm';
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
      const total = await this.articlesRepository.count();
      let articles: ArticleEntity[] = [];

      if (title) {
        articles = await this.articlesRepository.find({
          where: { title: ILike(`%${title}%`) },
          skip,
          take,
        });
      } else {
        articles = await this.articlesRepository.find({
          skip,
          take,
        });
      }

      return {
        articles,
        total,
      };
    } catch (error) {
      throw error;
    }
  }

  create(dto: CreateArticleDto): Promise<ArticleEntity> {
    try {
      return this.articlesRepository.save(dto);
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
