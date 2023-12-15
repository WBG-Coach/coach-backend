import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1702578654640 implements MigrationInterface {
    name = 'migrations1702578654640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "region" DROP CONSTRAINT "FK_2547f55866c0274d35fdd9a29c0"`);
        await queryRunner.query(`ALTER TABLE "region" ADD CONSTRAINT "FK_2547f55866c0274d35fdd9a29c0" FOREIGN KEY ("parent_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "region" DROP CONSTRAINT "FK_2547f55866c0274d35fdd9a29c0"`);
        await queryRunner.query(`ALTER TABLE "region" ADD CONSTRAINT "FK_2547f55866c0274d35fdd9a29c0" FOREIGN KEY ("parent_id") REFERENCES "region"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
