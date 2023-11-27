import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1701087409015 implements MigrationInterface {
    name = 'migrations1701087409015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "region" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, CONSTRAINT "PK_5f48ffc3af96bc486f5f3f3a6da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "school" ADD "region_id" uuid`);
        await queryRunner.query(`ALTER TABLE "school" ADD CONSTRAINT "FK_4fac13785b4a4447b28b3a68cae" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school" DROP CONSTRAINT "FK_4fac13785b4a4447b28b3a68cae"`);
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "region_id"`);
        await queryRunner.query(`DROP TABLE "region"`);
    }

}
