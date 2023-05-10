import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1683672255061 implements MigrationInterface {
    name = 'migrations1683672255061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "competence" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "question" ALTER COLUMN "title" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "question" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teacher" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "school" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_5af1cd1e18b4f118aa3a4b88eb2"`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "value" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "question_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "session_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "image" ALTER COLUMN "data" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "feedback" ALTER COLUMN "value" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "documentation" ALTER COLUMN "value" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sync" ALTER COLUMN "model" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sync" ALTER COLUMN "deviceId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sync" ALTER COLUMN "apiLevel" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sync" ALTER COLUMN "lastPulledAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_5af1cd1e18b4f118aa3a4b88eb2" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_5af1cd1e18b4f118aa3a4b88eb2"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194"`);
        await queryRunner.query(`ALTER TABLE "sync" ALTER COLUMN "lastPulledAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sync" ALTER COLUMN "apiLevel" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sync" ALTER COLUMN "deviceId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sync" ALTER COLUMN "model" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "documentation" ALTER COLUMN "value" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "feedback" ALTER COLUMN "value" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "image" ALTER COLUMN "data" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "session_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "question_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" ALTER COLUMN "value" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_5af1cd1e18b4f118aa3a4b88eb2" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "school" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "teacher" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "question" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "question" ALTER COLUMN "title" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "competence" ALTER COLUMN "title" SET NOT NULL`);
    }

}
