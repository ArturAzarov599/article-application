import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('auth')
export class AuthEntity {
  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;
}
