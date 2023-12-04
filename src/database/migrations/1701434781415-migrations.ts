import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1701434781415 implements MigrationInterface {
    name = 'migrations1701434781415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "region" ADD "parent_id" uuid`);
        await queryRunner.query(`ALTER TABLE "region" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "region" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "region" ADD CONSTRAINT "FK_2547f55866c0274d35fdd9a29c0" FOREIGN KEY ("parent_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "region" DROP CONSTRAINT "FK_2547f55866c0274d35fdd9a29c0"`);
        await queryRunner.query(`ALTER TABLE "region" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "region" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "region" DROP COLUMN "parent_id"`);
    }

}
