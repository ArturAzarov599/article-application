import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { AuthEntity } from 'src/entities/auth.entity';

import { AuthDto } from '@auth/dto/auth.dto';

import { IAuthRepository } from '@auth/repositories/interfaces/auth-repository.interface';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
  ) {}

  findCredentials(email: string): Promise<AuthEntity> {
    try {
      return this.authRepository.findOne({
        where: { email },
      });
    } catch (error) {
      throw error;
    }
  }

  signUp({ email, password }: AuthDto): Promise<AuthEntity> {
    try {
      return this.authRepository.save({ email, password });
    } catch (error) {
      throw error;
    }
  }

  async deleteCredentials(email: string): Promise<boolean> {
    try {
      const credentials = await this.findCredentials(email);

      if (!credentials) throw new NotFoundException();

      await this.authRepository.remove(credentials);

      return true;
    } catch (error) {
      throw error;
    }
  }
}