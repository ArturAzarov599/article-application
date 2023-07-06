import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthEntity } from '@entities/auth.entity';

export const imports: DynamicModule[] = [
  TypeOrmModule.forFeature([AuthEntity]),
];
