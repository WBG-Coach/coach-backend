import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1700877117412 implements MigrationInterface {
    name = 'migrations1700877117412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school" RENAME COLUMN "region" TO "region_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school" RENAME COLUMN "region_old" TO "region"`);
    }

}
