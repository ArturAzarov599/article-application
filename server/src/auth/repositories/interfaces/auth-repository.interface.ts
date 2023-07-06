import { AuthEntity } from 'src/entities/auth.entity';

import { AuthDto } from '@auth/dto/auth.dto';

export interface IAuthRepository {
  findCredentials(email: string): Promise<AuthEntity>;
  signUp(dto: AuthDto): Promise<AuthEntity>;
  deleteCredentials(email: string): Promise<boolean>;
}
