import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1697206199589 implements MigrationInterface {
  name = "migrations1697206199589";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_5351647a4a00ccbca90adb057f6"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_5351647a4a00ccbca90adb057f6" FOREIGN KEY ("feedback_id") REFERENCES "feedback"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
