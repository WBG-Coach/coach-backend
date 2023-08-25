import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1692971852545 implements MigrationInterface {
  name = "migrations1692971852545";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "username"`);
    await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "school" ADD "region" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "school" ADD "emis_number" character varying`
    );
    await queryRunner.query(`ALTER TABLE "coach" ADD "school_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "feedback" ADD "school_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD "school_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "coach" ADD CONSTRAINT "FK_ab7b406da493dfc388b7dc35904" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coach" DROP CONSTRAINT "FK_ab7b406da493dfc388b7dc35904"`
    );
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "school_id"`);
    await queryRunner.query(`ALTER TABLE "feedback" DROP COLUMN "school_id"`);
    await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "school_id"`);
    await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "emis_number"`);
    await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "region"`);
    await queryRunner.query(
      `ALTER TABLE "coach" ADD "password" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "coach" ADD "username" character varying`
    );
  }
}
