import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1702580434503 implements MigrationInterface {
    name = 'migrations1702580434503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "region" DROP CONSTRAINT "FK_2547f55866c0274d35fdd9a29c0"`);
        await queryRunner.query(`ALTER TABLE "region" RENAME COLUMN "parent_id" TO "parentId"`);
        await queryRunner.query(`ALTER TABLE "region" ADD CONSTRAINT "FK_ed0c8098ce6809925a437f42aec" FOREIGN KEY ("parentId") REFERENCES "region"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "region" DROP CONSTRAINT "FK_ed0c8098ce6809925a437f42aec"`);
        await queryRunner.query(`ALTER TABLE "region" RENAME COLUMN "parentId" TO "parent_id"`);
        await queryRunner.query(`ALTER TABLE "region" ADD CONSTRAINT "FK_2547f55866c0274d35fdd9a29c0" FOREIGN KEY ("parent_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
