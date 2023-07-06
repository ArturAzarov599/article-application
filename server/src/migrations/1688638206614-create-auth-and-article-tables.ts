import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuthAndArticleTables1688638206614 implements MigrationInterface {
    name = 'CreateAuthAndArticleTables1688638206614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth" ("email" character varying NOT NULL, "password" character varying NOT NULL, "username" character varying NOT NULL, CONSTRAINT "UQ_366ebf23d8f3781bb7bb37abbd1" UNIQUE ("username"), CONSTRAINT "PK_b54f616411ef3824f6a5c06ea46" PRIMARY KEY ("email"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" character varying NOT NULL, "title" character varying NOT NULL, "link" character varying NOT NULL, "publish_date" date NOT NULL, "creator" character varying NOT NULL, CONSTRAINT "UQ_3c28437db9b5137136e1f6d6096" UNIQUE ("title"), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "auth"`);
    }

}
