import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1683126506363 implements MigrationInterface {
  name = "migrations1683126506363";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" character varying NOT NULL, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "sync" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "model" character varying NOT NULL, "deviceId" character varying NOT NULL, "apiLevel" character varying NOT NULL, "lastPulledAt" integer NOT NULL, CONSTRAINT "PK_43a2b32a81faa38521e1f74b368" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP COLUMN "howManyStudents"`
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "howManyBoys"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "howManyGirls"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "howLongTime"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "school" ADD "createdAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "school" ADD "updatedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "school" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "answer" ADD "createdAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "answer" ADD "updatedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "answer" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD "boys_count" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD "girls_count" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD "lesson_time" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2"`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" DROP CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194"`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" DROP CONSTRAINT "FK_5af1cd1e18b4f118aa3a4b88eb2"`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ALTER COLUMN "question_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ALTER COLUMN "session_id" SET NOT NULL`
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
      `ALTER TABLE "session" ALTER COLUMN "coach_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "school_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ALTER COLUMN "teacher_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "FK_5af1cd1e18b4f118aa3a4b88eb2" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
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
      `ALTER TABLE "answer" DROP CONSTRAINT "FK_5af1cd1e18b4f118aa3a4b88eb2"`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" DROP CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2"`
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
      `ALTER TABLE "session" ADD CONSTRAINT "FK_e2edd036d661329fdb5b8e3ab43" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_a4c02bb32455cc20be9a02ea3b4" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_31e88904f181e92d5b7f88eceb0" FOREIGN KEY ("coach_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ALTER COLUMN "session_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ALTER COLUMN "question_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "FK_5af1cd1e18b4f118aa3a4b88eb2" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "school_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_ed1bcfe9ae995a567b529f316a2" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "lesson_time"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "girls_count"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "boys_count"`);
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD "howLongTime" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD "howManyGirls" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD "howManyBoys" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD "howManyStudents" integer NOT NULL`
    );
    await queryRunner.query(`DROP TABLE "sync"`);
    await queryRunner.query(`DROP TABLE "image"`);
  }
}
