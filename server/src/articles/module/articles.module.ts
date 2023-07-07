import { Module } from '@nestjs/common';

import { AuthModule } from '@auth/module/auth.module';

import { imports } from '@articles/module/imports';
import { providers } from '@articles/module/providers';

import { ArticlesController } from '@articles/controllers/articles.controller';

@Module({
  providers,
  controllers: [ArticlesController],
  imports: [...imports, AuthModule],
})
export class ArticlesModule {}
