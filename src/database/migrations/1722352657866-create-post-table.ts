import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostTable1722352657866 implements MigrationInterface {
  name = 'CreatePostTable1722352657866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "post" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "slug" character varying NOT NULL,
        "description" character varying,
        "content" character varying,
        "user_id" uuid NOT NULL,
        "deleted_at" TIMESTAMP WITH TIME ZONE,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "created_by" character varying NOT NULL,
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_by" character varying NOT NULL,
        CONSTRAINT "PK_post_id" PRIMARY KEY ("id")
      )
  `);

    await queryRunner.query(`
      ALTER TABLE "post"
      ADD CONSTRAINT "FK_post_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "post" DROP CONSTRAINT "FK_post_user_id"
    `);
    await queryRunner.query(`
      DROP TABLE "post"
    `);
  }
}
