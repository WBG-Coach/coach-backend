import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1696978827169 implements MigrationInterface {
    name = 'migrations1696978827169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ADD "feedback_id" uuid`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_5351647a4a00ccbca90adb057f6" FOREIGN KEY ("feedback_id") REFERENCES "feedback"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_5351647a4a00ccbca90adb057f6"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "feedback_id"`);
    }

}
