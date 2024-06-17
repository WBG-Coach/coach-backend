import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1718665191767 implements MigrationInterface {
  name = "Migrations1718665191767";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "login_attempt" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "created_at" bigint NOT NULL, CONSTRAINT "PK_72829cd4f7424e3cdfd46c476c0" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "force_logout" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "force_logout"`);
    await queryRunner.query(`DROP TABLE "login_attempt"`);
  }
}
