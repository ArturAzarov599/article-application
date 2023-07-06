import {
  Controller,
  Get,
  Inject,
  Post,
  Delete,
  Put,
  Param,
  Query,
  Body,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';

import { AuthGuard } from '@common/guards/auth.guard';

import { ErrorDto } from '@common/dto/error.dto';
import { ArticleDto } from '@articles/dtos/article.dto';
import { GetArticlesDto } from '@articles/dtos/get-articles.dto';
import { CreateArticleDto } from '@articles/dtos/create-article.dto';
import { GetAllArticlesDto } from '@articles/dtos/get-all-articles.dto';

import { IArticleService } from '@articles/services/interfaces/articles-service.interface';

import { ARTICLES_SERVICE_TOKEN } from 'src/injection-tokens';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(
    @Inject(ARTICLES_SERVICE_TOKEN)
    private readonly articlesService: IArticleService,
  ) {}

  @Get()
  @ApiResponse({
    status: HttpStatusCode.Ok,
    type: GetAllArticlesDto,
  })
  get(@Query() dto: GetArticlesDto): Promise<GetAllArticlesDto> {
    try {
      return this.articlesService.get(dto);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: `Make request without token or expired token`,
  })
  @ApiBody({ type: CreateArticleDto })
  @ApiResponse({
    status: HttpStatusCode.Created,
    type: ArticleDto,
  })
  @ApiResponse({
    status: HttpStatusCode.BadRequest,
    type: ErrorDto,
  })
  create(@Body() dto: CreateArticleDto): Promise<ArticleDto> {
    try {
      return this.articlesService.create(dto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: `Make request without token or expired token`,
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiResponse({
    status: HttpStatusCode.Ok,
    type: ArticleDto,
  })
  @ApiResponse({
    status: HttpStatusCode.NotFound,
    type: ErrorDto,
  })
  delete(@Param('id') id: string): Promise<ArticleDto> {
    try {
      return this.articlesService.delete(id);
    } catch (error) {
      throw error;
    }
  }

  @Put()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: `Make request without token or expired token`,
  })
  @ApiBody({ type: ArticleDto })
  @ApiResponse({
    status: HttpStatusCode.Ok,
    type: ArticleDto,
  })
  @ApiResponse({
    status: HttpStatusCode.NotFound,
    type: ErrorDto,
  })
  update(@Body() dto: Partial<ArticleDto>): Promise<ArticleDto> {
    try {
      return this.articlesService.update(dto);
    } catch (error) {
      throw error;
    }
  }
}
