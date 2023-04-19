import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1681916729702 implements MigrationInterface {
    name = 'migrations1681916729702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" ADD "coach_id" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD "school_id" uuid`);
        await queryRunner.query(`ALTER TABLE "session" ADD "howManyStudents" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD "howManyBoys" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD "howManyGirls" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD "subject" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD "howLongTime" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD "objective" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD "keyPoints" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "FK_b9917412faa394c182f8e2f061e" FOREIGN KEY ("coach_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_b9917412faa394c182f8e2f061e"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "keyPoints"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "objective"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "howLongTime"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "subject"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "howManyGirls"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "howManyBoys"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "howManyStudents"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "school_id"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "coach_id"`);
    }

}
