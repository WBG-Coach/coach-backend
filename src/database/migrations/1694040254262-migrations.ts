import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1694040254262 implements MigrationInterface {
  name = "migrations1694040254262";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "feedback" DROP COLUMN "school_id"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "feedback" ADD "school_id" character varying`
    );
  }
}
