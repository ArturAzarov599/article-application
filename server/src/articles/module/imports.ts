import { HttpModule } from '@nestjs/axios';
import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArticleEntity } from '@entities/article.entity';

export const imports: DynamicModule[] = [
  HttpModule.register({
    timeout: 4000,
    maxRedirects: 5,
  }),
  TypeOrmModule.forFeature([ArticleEntity]),
];
