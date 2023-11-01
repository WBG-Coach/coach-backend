import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1698781959192 implements MigrationInterface {
  name = "migrations1698781959192";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "school_id"`);
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'admin'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'admin'`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD "school_id" character varying`
    );
  }
}
