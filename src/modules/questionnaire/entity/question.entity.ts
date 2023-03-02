import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Competence } from "../../competencies/entity/competence.entity";
import { Questionnaire } from "./questionnaire.entity";

@Entity()
export class Question {
  constructor(question?: Partial<Question>) {
    Object.assign(this, question);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: number;

  @Column()
  title?: string;

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.id)
  @JoinColumn({ name: "questionnaire_id" })
  questionnaire?: Questionnaire;

  @ManyToOne(() => Competence, (competence) => competence.id)
  @JoinColumn({ name: "competence_id" })
  competence?: Competence;
}
