import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1684865658227 implements MigrationInterface {
    name = 'migrations1684865658227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "coach" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "image_id" character varying, "created_at" TIMESTAMP, "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, CONSTRAINT "PK_c2ca0875fe0755b197d0147713d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "coach"`);
    }

}
