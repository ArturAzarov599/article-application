import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { AuthDto } from '@auth/dtos/auth.dto';

export class ExtendedAuthDto extends AuthDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;
}
