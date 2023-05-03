import { Question } from "../../question/entity/question.entity";
import { Session } from "../../session/entity/session.entity";
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Answer {
  constructor(answer?: Partial<Answer>) {
    Object.assign(this, answer);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: number;

  @Column()
  value?: string;

  @Column()
  question_id?: string;

  @Column()
  session_id?: string;

  @ManyToOne(() => Question, (question) => question.id)
  @JoinColumn({ name: "question_id" })
  question?: Question;

  @ManyToOne(() => Session, (session) => session.id)
  @JoinColumn({ name: "session_id" })
  session?: Session;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @Column()
  deletedAt?: Date;
}
