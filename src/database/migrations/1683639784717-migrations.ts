import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1683639784717 implements MigrationInterface {
  name = "migrations1683639784717";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "competence" DROP CONSTRAINT "FK_1dfd6ab9f31936f546e0452e5d1"`
    );
    await queryRunner.query(`ALTER TABLE "competence" DROP COLUMN "guide_id"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "question" ADD "tooltip_data" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD "type" character varying`
    );
    await queryRunner.query(`ALTER TABLE "image" ADD "name" character varying`);
    await queryRunner.query(
      `ALTER TABLE "teacher" ADD "surname" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ADD "emis_number" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ADD "subject" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ADD "birthdate" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ADD "school_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ADD "image_id" character varying`
    );
    await queryRunner.query(`ALTER TABLE "teacher" ADD "created_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "teacher" ADD "updated_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "teacher" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "user" ADD "type" character varying`);
    await queryRunner.query(`ALTER TABLE "user" ADD "created_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "user" ADD "updated_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "user" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "school" ADD "created_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "school" ADD "updated_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "school" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "answer" ADD "created_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "answer" ADD "updated_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "answer" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD "session_status" character varying`
    );
    await queryRunner.query(`ALTER TABLE "session" ADD "created_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "session" ADD "updated_at" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "session" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_71d809af9271b147ca6aaf13868"`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" DROP CONSTRAINT "FK_b9917412faa394c182f8e2f061e"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2"`
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
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "boys_count"`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD "boys_count" character varying`
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "girls_count"`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD "girls_count" character varying`
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "lesson_time"`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD "lesson_time" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_71d809af9271b147ca6aaf13868" FOREIGN KEY ("competence_id") REFERENCES "competence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ADD CONSTRAINT "FK_b9917412faa394c182f8e2f061e" FOREIGN KEY ("coach_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
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
    await queryRunner.query(`DROP TABLE "guide"`);
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
      `ALTER TABLE "user" DROP CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2"`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" DROP CONSTRAINT "FK_b9917412faa394c182f8e2f061e"`
    );
    await queryRunner.query(
      `ALTER TABLE "question" DROP CONSTRAINT "FK_71d809af9271b147ca6aaf13868"`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "teacher_id" DROP`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "school_id" DROP`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "coach_id" DROP`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "applicationDate" DROP`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "keyPoints" DROP`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "objective" DROP`
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "lesson_time"`);
    await queryRunner.query(`ALTER TABLE "session" ADD "lesson_time" integer`);
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "subject" DROP`
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "girls_count"`);
    await queryRunner.query(`ALTER TABLE "session" ADD "girls_count" integer`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "boys_count"`);
    await queryRunner.query(`ALTER TABLE "session" ADD "boys_count" integer`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_e2edd036d661329fdb5b8e3ab43" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_a4c02bb32455cc20be9a02ea3b4" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_31e88904f181e92d5b7f88eceb0" FOREIGN KEY ("coach_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "school_id" DROP`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ALTER COLUMN "coach_id" DROP`
    );
    await queryRunner.query(
      `ALTER TABLE "teacher" ADD CONSTRAINT "FK_b9917412faa394c182f8e2f061e" FOREIGN KEY ("coach_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "question" ALTER COLUMN "competence_id" DROP`
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_71d809af9271b147ca6aaf13868" FOREIGN KEY ("competence_id") REFERENCES "competence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "session" DROP COLUMN "session_status"`
    );
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "image_id"`);
    await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "school_id"`);
    await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "birthdate"`);
    await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "subject"`);
    await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "emis_number"`);
    await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "surname"`);
    await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "type"`);
    await queryRunner.query(
      `ALTER TABLE "question" DROP COLUMN "tooltip_data"`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD "status" character varying`
    );
    await queryRunner.query(`ALTER TABLE "answer" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "answer" ADD "updatedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "answer" ADD "createdAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "school" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "school" ADD "updatedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "school" ADD "createdAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "competence" ADD "guide_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "competence" ADD CONSTRAINT "FK_1dfd6ab9f31936f546e0452e5d1" FOREIGN KEY ("guide_id") REFERENCES "guide"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
