import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1684356309687 implements MigrationInterface {
    name = 'migrations1684356309687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_31e88904f181e92d5b7f88eceb0"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_a4c02bb32455cc20be9a02ea3b4"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_e2edd036d661329fdb5b8e3ab43"`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "subject" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "objective" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "keyPoints" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "applicationDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "coach_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "school_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "teacher_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_31e88904f181e92d5b7f88eceb0" FOREIGN KEY ("coach_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_a4c02bb32455cc20be9a02ea3b4" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_e2edd036d661329fdb5b8e3ab43" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_e2edd036d661329fdb5b8e3ab43"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_a4c02bb32455cc20be9a02ea3b4"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_31e88904f181e92d5b7f88eceb0"`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "teacher_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "school_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "coach_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "applicationDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "keyPoints" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "objective" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "subject" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_e2edd036d661329fdb5b8e3ab43" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_a4c02bb32455cc20be9a02ea3b4" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_31e88904f181e92d5b7f88eceb0" FOREIGN KEY ("coach_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
