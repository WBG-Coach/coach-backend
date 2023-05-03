import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1683127832861 implements MigrationInterface {
    name = 'migrations1683127832861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "school_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "deletedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "school" ALTER COLUMN "createdAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "school" ALTER COLUMN "updatedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "school" ALTER COLUMN "deletedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "boys_count"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "boys_count" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "girls_count"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "girls_count" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "lesson_time"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "lesson_time" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "createdAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "updatedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "deletedAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2"`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "deletedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "updatedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "createdAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "lesson_time"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "lesson_time" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "girls_count"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "girls_count" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "boys_count"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "boys_count" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "school" ALTER COLUMN "deletedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "school" ALTER COLUMN "updatedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "school" ALTER COLUMN "createdAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "deletedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "school_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
