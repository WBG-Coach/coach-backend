import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1683127484669 implements MigrationInterface {
  name = "migrations1683127484669";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2"`
    );
    await queryRunner.query(`ALTER TABLE "sync" DROP COLUMN "apiLevel"`);
    await queryRunner.query(
      `ALTER TABLE "sync" ADD "apiLevel" integer NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "sync" DROP COLUMN "lastPulledAt"`);
    await queryRunner.query(
      `ALTER TABLE "sync" ADD "lastPulledAt" TIMESTAMP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2"`
    );
    await queryRunner.query(`ALTER TABLE "sync" DROP COLUMN "lastPulledAt"`);
    await queryRunner.query(
      `ALTER TABLE "sync" ADD "lastPulledAt" integer NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "sync" DROP COLUMN "apiLevel"`);
    await queryRunner.query(
      `ALTER TABLE "sync" ADD "apiLevel" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ALTER COLUMN "deletedAt" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ALTER COLUMN "updatedAt" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ALTER COLUMN "createdAt" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "school" ALTER COLUMN "deletedAt" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "school" ALTER COLUMN "updatedAt" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "school" ALTER COLUMN "createdAt" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "deletedAt" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "updatedAt" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "createdAt" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "school_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
