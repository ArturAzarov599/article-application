import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { IAuthService } from '@auth/services/interfaces/auth-service.interface';

import { AUTH_SERVICE_TOKEN } from 'src/injection-tokens';

const extractTokenFromHeader = (request: Request): string => {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : '';
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: IAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const jwtSecret = this.configService.get<string>('JWT_SECRET');
      await this.jwtService.verifyAsync(token, {
        secret: jwtSecret,
      });

      await this.authService.findByEmail(request.body.email);
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
