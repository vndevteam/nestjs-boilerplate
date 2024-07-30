import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePostTable1722352657866 implements MigrationInterface {
  name = 'CreatePostTable1722352657866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "post" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "slug" character varying NOT NULL,
        "title" character varying NOT NULL,
        "description" character varying,
        "content" character varying,
        "deleted_at" TIMESTAMP WITH TIME ZONE,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "created_by" character varying NOT NULL,
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_by" character varying NOT NULL,
        CONSTRAINT "PK_post_id" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "post"
    `);
  }
}
