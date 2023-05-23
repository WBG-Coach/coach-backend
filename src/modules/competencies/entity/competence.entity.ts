import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Competence {
  constructor(competence?: Partial<Competence>) {
    Object.assign(this, competence);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ nullable: true })
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;
}
