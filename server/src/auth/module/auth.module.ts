import { Module } from '@nestjs/common';

import { AuthController } from '@auth/controllers/auth.controller';

import { imports } from '@auth/module/imports';
import { providers } from '@auth/module/providers';

@Module({
  controllers: [AuthController],
  providers,
  imports,
})
export class AuthModule {}
