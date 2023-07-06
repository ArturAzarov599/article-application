import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';

export class ErrorDto {
  @IsEnum(HttpStatus)
  @ApiProperty({ enum: HttpStatus })
  statusCode: HttpStatus;

  @ApiProperty({ type: String })
  @IsString()
  message: string;

  @ApiProperty({ type: String })
  @IsString()
  error: string;
}
