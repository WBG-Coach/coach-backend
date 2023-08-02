import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1690987408203 implements MigrationInterface {
    name = 'migrations1690987408203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2"`);
        await queryRunner.query(`CREATE TABLE "log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP, CONSTRAINT "PK_350604cbdf991d5930d9e618fbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "school_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "type" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "school_id" uuid`);
        await queryRunner.query(`DROP TABLE "log"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
