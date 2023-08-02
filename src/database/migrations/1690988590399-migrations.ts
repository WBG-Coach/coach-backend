import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1690988590399 implements MigrationInterface {
    name = 'migrations1690988590399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "log" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "log" ADD CONSTRAINT "FK_0d5473a41a198fd20e7920889b0" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "log" DROP CONSTRAINT "FK_0d5473a41a198fd20e7920889b0"`);
        await queryRunner.query(`ALTER TABLE "log" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "log" ADD "user_id" character varying NOT NULL`);
    }

}
