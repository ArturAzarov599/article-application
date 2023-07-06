import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ArticleDto } from '@articles/dtos/article.dto';

export class GetAllArticlesDto {
  @ApiProperty({ type: ArticleDto, isArray: true })
  articles: ArticleDto[];

  @ApiProperty()
  @IsNumber()
  total: number;
}
