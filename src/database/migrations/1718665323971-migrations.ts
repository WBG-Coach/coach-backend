import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1718665323971 implements MigrationInterface {
  name = "Migrations1718665323971";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "login_attempt" DROP COLUMN "created_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "login_attempt" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_5351647a4a00ccbca90adb057f6"`
    );
    await queryRunner.query(
      `ALTER TABLE "login_attempt" DROP COLUMN "created_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "login_attempt" ADD "created_at" bigint NOT NULL`
    );
  }
}
