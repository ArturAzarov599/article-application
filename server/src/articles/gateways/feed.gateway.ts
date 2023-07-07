import { Server } from 'socket.io';
import { XMLParser } from 'fast-xml-parser';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Inject, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { ArticleDto } from '@articles/dtos/article.dto';

import { IFeedGateway } from '@articles/gateways/interfaces/feed-gateway.interface';
import { IArticlesRepository } from '@articles/repositories/interfaces/articles-repository.interface';
import { IParsedOriginalArticle } from '@articles/services/interfaces/parsed-original-article.interface';

import { ARTICLES_REPOSITORY_TOKEN } from 'src/injection-tokens';

@WebSocketGateway()
export class FeedGateway implements IFeedGateway {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject(ARTICLES_REPOSITORY_TOKEN)
    private readonly articlesRepository: IArticlesRepository,
  ) {}

  @WebSocketServer()
  private readonly server: Server;
  private readonly parser: XMLParser = new XMLParser();
  private readonly logger = new Logger(FeedGateway.name);
  private rssUrl: string = this.configService.get<string>('RSS_FEED_API_URL');

  onModuleInit() {
    this.server.on('connection', () => console.log(`Connected`));
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async fetchFeeds() {
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
      this.server.emit('onFetchFeeds');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
