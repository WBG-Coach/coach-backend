import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1688392240673 implements MigrationInterface {
    name = 'migrations1688392240673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_b9917412faa394c182f8e2f061e"`);
        await queryRunner.query(`ALTER TABLE "session" RENAME COLUMN "keyPoints" TO "key_points"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "coach_id"`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "emis_number" character varying`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "username" character varying`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "birthdate"`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "birthdate" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "birthdate"`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "birthdate" character varying`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "emis_number"`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "coach_id" uuid`);
        await queryRunner.query(`ALTER TABLE "session" RENAME COLUMN "key_points" TO "keyPoints"`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "FK_b9917412faa394c182f8e2f061e" FOREIGN KEY ("coach_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
