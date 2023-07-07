import { Provider } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { FeedGateway } from '@articles/gateways/feed.gateway';
import { ArticlesService } from '@articles/services/articles.service';
import { ArticlesRepository } from '@articles/repositories/articles.repository';

import {
  ARTICLES_SERVICE_TOKEN,
  ARTICLES_REPOSITORY_TOKEN,
} from 'src/injection-tokens';

export const providers: Provider[] = [
  {
    useClass: ArticlesService,
    provide: ARTICLES_SERVICE_TOKEN,
  },
  {
    useClass: ArticlesRepository,
    provide: ARTICLES_REPOSITORY_TOKEN,
  },
  JwtService,
  FeedGateway,
];
