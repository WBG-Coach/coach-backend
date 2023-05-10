import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1683671372237 implements MigrationInterface {
  name = "migrations1683671372237";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_71d809af9271b147ca6aaf13868"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "name" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_31e88904f181e92d5b7f88eceb0"`
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_a4c02bb32455cc20be9a02ea3b4"`
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_e2edd036d661329fdb5b8e3ab43"`
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_71d809af9271b147ca6aaf13868" FOREIGN KEY ("competence_id") REFERENCES "competence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_31e88904f181e92d5b7f88eceb0" FOREIGN KEY ("coach_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_a4c02bb32455cc20be9a02ea3b4" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_e2edd036d661329fdb5b8e3ab43" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_e2edd036d661329fdb5b8e3ab43"`
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_a4c02bb32455cc20be9a02ea3b4"`
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_31e88904f181e92d5b7f88eceb0"`
    );
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_71d809af9271b147ca6aaf13868"`
    );
    await queryRunner.query(
      `ALTER TABLE "image" ALTER COLUMN "name" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ALTER COLUMN "deleted_at" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ALTER COLUMN "updated_at" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ALTER COLUMN "created_at" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "deleted_at" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "updated_at" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "created_at" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "teacher_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "school_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "coach_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "applicationDate" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "keyPoints" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "objective" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "lesson_time" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "subject" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "girls_count" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "boys_count" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "session_status" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_e2edd036d661329fdb5b8e3ab43" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_a4c02bb32455cc20be9a02ea3b4" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_31e88904f181e92d5b7f88eceb0" FOREIGN KEY ("coach_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "school" ALTER COLUMN "deleted_at" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "school" ALTER COLUMN "updated_at" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "school" ALTER COLUMN "created_at" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "deleted_at" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "updated_at" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "created_at" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "image_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "school_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "birthdate" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "subject" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "emis_number" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "surname" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "question" ALTER COLUMN "competence_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "question" ALTER COLUMN "type" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "question" ALTER COLUMN "tooltip_data" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_71d809af9271b147ca6aaf13868" FOREIGN KEY ("competence_id") REFERENCES "competence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
