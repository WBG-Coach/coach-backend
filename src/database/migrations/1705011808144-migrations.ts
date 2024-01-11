import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1705011808144 implements MigrationInterface {
    name = 'Migrations1705011808144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "otp" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "coach_id" uuid, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "district"`);
        await queryRunner.query(`ALTER TABLE "otp" ADD CONSTRAINT "FK_2b232c6eac98f99d29a0ec6950e" FOREIGN KEY ("coach_id") REFERENCES "coach"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp" DROP CONSTRAINT "FK_2b232c6eac98f99d29a0ec6950e"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "district" character varying`);
        await queryRunner.query(`DROP TABLE "otp"`);
    }

}
