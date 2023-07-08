import { Length } from 'class-validator';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('auth')
export class AuthEntity {
  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  @Length(5, 200)
  username: string;
}
