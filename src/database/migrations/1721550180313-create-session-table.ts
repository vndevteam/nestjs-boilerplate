import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSessionTable1721550180313 implements MigrationInterface {
  name = 'CreateSessionTable1721550180313';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "session" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "hash" character varying(255) NOT NULL,
        "user_id" uuid NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "created_by" character varying NOT NULL,
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_by" character varying NOT NULL,
        CONSTRAINT "PK_session_id" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "session"
      ADD CONSTRAINT "FK_session_user" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "session" DROP CONSTRAINT "FK_session_user"
    `);
    await queryRunner.query(`
      DROP TABLE "session"
    `);
  }
}
