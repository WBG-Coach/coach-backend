import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Session } from "../../session/entity/session.entity";
import { Option } from "./options.entity";
import { Question } from "./question.entity";

@Entity()
export class Answer {
  constructor(answer?: Partial<Answer>) {
    Object.assign(this, answer);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: number;

  @Column()
  value?: string;

  @ManyToOne(() => Question, (question) => question.id)
  @JoinColumn({ name: "question_id" })
  question?: Question;

  @ManyToOne(() => Option, (option) => option.id)
  @JoinColumn({ name: "option_id" })
  option?: Option;

  @ManyToOne(() => Session, (session) => session.id)
  @JoinColumn({ name: "session_id" })
  session?: Session;
}
