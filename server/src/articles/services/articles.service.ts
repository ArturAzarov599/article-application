import { HttpService } from '@nestjs/axios';
import { XMLParser } from 'fast-xml-parser';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Inject, Injectable, Logger } from '@nestjs/common';

import { ArticleDto } from '@articles/dtos/article.dto';
import { GetArticlesDto } from '@articles/dtos/get-articles.dto';
import { CreateArticleDto } from '@articles/dtos/create-article.dto';
import { GetAllArticlesDto } from '@articles/dtos/get-all-articles.dto';

import { IArticleService } from '@articles/services/interfaces/articles-service.interface';
import { IArticlesRepository } from '@articles/repositories/interfaces/articles-repository.interface';
import { IParsedOriginalArticle } from '@articles/services/interfaces/parsed-original-article.interface';

import { ARTICLES_REPOSITORY_TOKEN } from 'src/injection-tokens';

@Injectable()
export class ArticlesService implements IArticleService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(ARTICLES_REPOSITORY_TOKEN)
    private readonly articlesRepository: IArticlesRepository,
  ) {}

  private readonly parser: XMLParser = new XMLParser();
  private readonly logger = new Logger(ArticlesService.name);
  private rssUrl: string = this.configService.get<string>('RSS_FEED_API_URL');

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

  @Cron(CronExpression.EVERY_HOUR)
  async fetchArticles(): Promise<void> {
    try {
      this.logger.log('Fetch new articles');
      const response = await this.httpService.axiosRef.get(this.rssUrl);
      const articles: ArticleDto[] = this.parser
        .parse(response.data)
        .rss.channel.item.map(
          (item: IParsedOriginalArticle): ArticleDto => ({
            id: item.guid,
            title: item.title,
            link: item.link,
            publishDate: item.pubDate,
            creator: item['dc:creator'],
          }),
        );

      await this.articlesRepository.saveMany(articles);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
