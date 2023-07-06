import { AuthDto } from '@auth/dto/auth.dto';

export interface IAuthService {
  signIn(dto: AuthDto): Promise<string>;
  signUp(dto: AuthDto): Promise<AuthDto>;
  deleteCredentials(email: string): Promise<boolean>;
}
