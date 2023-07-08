import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { AuthDto } from '@auth/dtos/auth.dto';

export class ExtendedAuthDto extends AuthDto {
  @ApiProperty()
  @IsString()
  username: string;
}
