import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1684863907877 implements MigrationInterface {
    name = 'migrations1684863907877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "competence" ADD "created_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "competence" ADD "updated_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "competence" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "question" ADD "created_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "question" ADD "updated_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "question" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "image" ADD "created_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "image" ADD "updated_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "image" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "documentation" ADD "created_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "documentation" ADD "updated_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "documentation" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD "created_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD "updated_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "sync" ADD "created_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "sync" ADD "updated_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "sync" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sync" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "sync" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "sync" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "feedback" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "feedback" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "feedback" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "documentation" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "documentation" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "documentation" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "competence" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "competence" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "competence" DROP COLUMN "created_at"`);
    }

}
