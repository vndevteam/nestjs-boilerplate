import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1718640549983 implements MigrationInterface {
  name = 'CreateUserTable1718640549983';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "bio" character varying NOT NULL DEFAULT '',
                "image" character varying NOT NULL DEFAULT '',
                "deleted_at" TIMESTAMP,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "created_by" character varying NOT NULL,
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_by" character varying NOT NULL,
                CONSTRAINT "PK_user_id" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "UQ_user_username" ON "user" ("username")
            WHERE "deleted_at" IS NULL
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "UQ_user_email" ON "user" ("email")
            WHERE "deleted_at" IS NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."UQ_user_email"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."UQ_user_username"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
  }
}
