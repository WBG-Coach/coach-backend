import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1717627320186 implements MigrationInterface {
  name = "Migrations1717627320186";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "otp" ADD "used" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "used"`);
  }
}
