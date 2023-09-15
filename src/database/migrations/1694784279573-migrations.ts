import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1694784279573 implements MigrationInterface {
    name = 'migrations1694784279573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "school_id"`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "school_id" uuid`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "FK_a1399028f9db85c88f2cf3f0b38" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_a1399028f9db85c88f2cf3f0b38"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "school_id"`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "school_id" character varying`);
    }

}
