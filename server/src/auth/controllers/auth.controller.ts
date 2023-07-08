import {
  Post,
  Body,
  Controller,
  Delete,
  UseGuards,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from '@common/guards/auth.guard';

import { AuthDto } from '@auth/dtos/auth.dto';
import { EmailDto } from '@auth/dtos/email.dto';
import { SignInDto } from '@auth/dtos/sign-in.dto';
import { ExtendedAuthDto } from '@auth/dtos/extended-auth.dto';

import { IAuthService } from '@auth/services/interfaces/auth-service.interface';

import { AUTH_SERVICE_TOKEN } from 'src/injection-tokens';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: IAuthService,
  ) {}

  @Post('sign-in')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully sign in',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'There are no user in DB',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: `Password don't match`,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'There is no user with current email',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `Body validation failed`,
  })
  signIn(@Body() body: AuthDto): Promise<SignInDto> {
    try {
      return this.authService.signIn(body);
    } catch (error) {
      throw error;
    }
  }

  @Post('sign-up')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully sign up',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User is already created or body validation failed',
  })
  async signUp(@Body() body: ExtendedAuthDto): Promise<boolean> {
    try {
      return this.authService.signUp(body);
    } catch (error) {
      throw error;
    }
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: HttpStatus.OK,
    description: `Successfully deleted user`,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: `Make request without token or expired token`,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: `User not found`,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: `Body validation failed`,
  })
  deleteCredentials(@Body() { email }: EmailDto): Promise<boolean> {
    try {
      return this.authService.deleteCredentials(email);
    } catch (error) {
      throw error;
    }
  }
}
