import { Module } from '@nestjs/common';

import { imports } from '@articles/module/imports';
import { providers } from '@articles/module/providers';

import { ArticlesController } from '@articles/controllers/articles.controller';

@Module({
  providers,
  controllers: [ArticlesController],
  imports,
})
export class ArticlesModule {}
