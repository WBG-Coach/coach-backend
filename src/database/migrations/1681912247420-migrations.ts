import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1681912247420 implements MigrationInterface {
  name = "migrations1681912247420";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_fa40da56981f3a6fe573e7dce19"`
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_a55488c4e3256a0d4bbc52ca785"`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" DROP CONSTRAINT "FK_69dad60c2f58e523232f06f5d8d"`
    );
    await queryRunner.query(
      `ALTER TABLE "question" RENAME COLUMN "questionnaire_id" TO "description"`
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP COLUMN "questionnaire_id"`
    );
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "option_id"`);
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "question" ADD "description" character varying NOT NULL`
    );
    await queryRunner.query(`DROP TABLE option`);
    await queryRunner.query(`DROP TABLE questionnaire`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "question" ADD "description" uuid`);
    await queryRunner.query(`ALTER TABLE "answer" ADD "option_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD "questionnaire_id" uuid`
    );
    await queryRunner.query(
      `ALTER TABLE "question" RENAME COLUMN "description" TO "questionnaire_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "FK_69dad60c2f58e523232f06f5d8d" FOREIGN KEY ("option_id") REFERENCES "option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_a55488c4e3256a0d4bbc52ca785" FOREIGN KEY ("questionnaire_id") REFERENCES "questionnaire"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_fa40da56981f3a6fe573e7dce19" FOREIGN KEY ("questionnaire_id") REFERENCES "questionnaire"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
