import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Competence {
  constructor(competence?: Partial<Competence>) {
    Object.assign(this, competence);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  title?: string;
}
