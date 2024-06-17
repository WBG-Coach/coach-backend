import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1718665677392 implements MigrationInterface {
  name = "Migrations1718665677392";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "login_attempt" DROP COLUMN "created_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "login_attempt" ADD "created_at" bigint NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "login_attempt" DROP COLUMN "created_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "login_attempt" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
  }
}
