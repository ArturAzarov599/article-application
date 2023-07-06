import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetArticlesDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  limit: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  skip: number;
}
