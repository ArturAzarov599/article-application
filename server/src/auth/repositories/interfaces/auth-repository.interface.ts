import { AuthEntity } from 'src/entities/auth.entity';

import { ExtendedAuthDto } from '@auth/dtos/extended-auth.dto';

export interface IAuthRepository {
  findCredentials(email: string): Promise<AuthEntity>;
  signUp(dto: ExtendedAuthDto): Promise<boolean>;
  deleteCredentials(email: string): Promise<boolean>;
}
