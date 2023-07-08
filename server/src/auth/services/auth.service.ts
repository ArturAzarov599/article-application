import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthEntity } from '@entities/auth.entity';

import { AuthDto } from '@auth/dtos/auth.dto';
import { SignInDto } from '@auth/dtos/sign-in.dto';
import { ExtendedAuthDto } from '@auth/dtos/extended-auth.dto';

import { IAuthService } from '@auth/services/interfaces/auth-service.interface';
import { IAuthRepository } from '@auth/repositories/interfaces/auth-repository.interface';

import { AUTH_REPOSITORY_TOKEN } from 'src/injection-tokens';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(AUTH_REPOSITORY_TOKEN)
    private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  findByEmail(email: string): Promise<AuthEntity> {
    try {
      return this.authRepository.findCredentials(email);
    } catch (error) {
      throw error;
    }
  }

  async signIn({ email, password }: AuthDto): Promise<SignInDto> {
    try {
      const userCredentials = await this.authRepository.findCredentials(email);

      if (!userCredentials) throw new NotFoundException(`User does not exist`);

      const isMatch = await bcrypt.compare(password, userCredentials.password);

      if (!isMatch) throw new UnauthorizedException();

      const token = await this.jwtService.signAsync(
        { email },
        { secret: this.configService.get<string>('JWT_SECRET') },
      );
      const { username } = await this.findByEmail(email);

      return {
        token,
        email,
        username,
      };
    } catch (error) {
      throw error;
    }
  }

  async signUp({
    email,
    password,
    username,
  }: ExtendedAuthDto): Promise<boolean> {
    try {
      const userCredentials = await this.authRepository.findCredentials(email);

      if (userCredentials) throw new BadRequestException(`User already exist`);

      const hash = await bcrypt.hash(password, 16);

      return this.authRepository.signUp({ email, password: hash, username });
    } catch (error) {
      throw error;
    }
  }

  deleteCredentials(email: string): Promise<boolean> {
    try {
      return this.authRepository.deleteCredentials(email);
    } catch (error) {
      throw error;
    }
  }
}
