import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { CreateArticleDto } from '@articles/dtos/create-article.dto';

export class ArticleDto extends CreateArticleDto {
  @ApiProperty()
  @IsString()
  id: string;
}
