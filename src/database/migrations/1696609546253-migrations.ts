import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1696609546253 implements MigrationInterface {
    name = 'migrations1696609546253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_991275f3b074424179de2090f42"`);
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_e5bfaf86ab81e5ce5c1b54559d7"`);
        await queryRunner.query(`ALTER TABLE "feedback" DROP COLUMN "session_id"`);
        await queryRunner.query(`ALTER TABLE "feedback" DROP COLUMN "competence_id"`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD "answer_id" uuid`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_845609147a39b5aa34b9bce206e" FOREIGN KEY ("answer_id") REFERENCES "answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_845609147a39b5aa34b9bce206e"`);
        await queryRunner.query(`ALTER TABLE "feedback" DROP COLUMN "answer_id"`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD "competence_id" uuid`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD "session_id" uuid`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_e5bfaf86ab81e5ce5c1b54559d7" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_991275f3b074424179de2090f42" FOREIGN KEY ("competence_id") REFERENCES "competence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
