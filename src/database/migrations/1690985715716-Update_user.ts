import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateUser1690985715716 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "role",
        type: "varchar",
        default: "'analist'",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
