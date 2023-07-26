import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "../../question/entity/question.entity";

@Entity()
export class Competence {
  constructor(competence?: Partial<Competence>) {
    Object.assign(this, competence);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: true })
  title?: string;

  @OneToMany(() => Question, (question) => question.competence)
  questions?: Question[];

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ nullable: true })
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;
}
