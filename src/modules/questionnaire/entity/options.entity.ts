import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./question.entity";

@Entity()
export class Option {
  constructor(option?: Partial<Option>) {
    Object.assign(this, option);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: number;

  @Column()
  title?: string;

  @ManyToOne(() => Question, (question) => question.id)
  @JoinColumn({ name: "question_id" })
  question?: Question;
}
