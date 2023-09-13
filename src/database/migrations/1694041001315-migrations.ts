import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1694041001315 implements MigrationInterface {
    name = 'migrations1694041001315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_991275f3b074424179de2090f42"`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_991275f3b074424179de2090f42" FOREIGN KEY ("competence_id") REFERENCES "competence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_991275f3b074424179de2090f42"`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_991275f3b074424179de2090f42" FOREIGN KEY ("competence_id") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
