import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1705331535248 implements MigrationInterface {
  name = "Migrations1705331535248";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "otp" DROP CONSTRAINT "FK_2b232c6eac98f99d29a0ec6950e"`
    );
    await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "coach_id"`);
    await queryRunner.query(
      `ALTER TABLE "otp" ADD "email" character varying NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "otp" ADD "coach_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "otp" ADD CONSTRAINT "FK_2b232c6eac98f99d29a0ec6950e" FOREIGN KEY ("coach_id") REFERENCES "coach"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
