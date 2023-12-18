import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1702585603182 implements MigrationInterface {
  name = "Migrations1702585603182";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "region" ADD "mpath" character varying DEFAULT ''`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "region" DROP COLUMN "mpath"`);
  }
}
