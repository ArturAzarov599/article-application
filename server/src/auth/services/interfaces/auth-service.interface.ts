import { AuthDto } from '@auth/dtos/auth.dto';
import { SignInDto } from '@auth/dtos/sign-in.dto';
import { ExtendedAuthDto } from '@auth/dtos/extended-auth.dto';

export interface IAuthService {
  signIn(dto: AuthDto): Promise<SignInDto>;
  signUp(dto: ExtendedAuthDto): Promise<boolean>;
  deleteCredentials(email: string): Promise<boolean>;
  findByEmail(email: string): Promise<AuthDto>;
}
