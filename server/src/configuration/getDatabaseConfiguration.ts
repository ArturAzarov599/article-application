import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfiguration = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  port: +configService.get<string>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [configService.get<string>('DB_ENTITIES_PATH')],
  migrations: [configService.get<string>('DB_MIGRATIONS_PATH')],
  synchronize: false,
  migrationsRun: true,
});
