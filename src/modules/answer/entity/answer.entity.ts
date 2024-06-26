import { Question } from "../../question/entity/question.entity";
import { Feedback } from "../../session/entity/feedback.entity";
import { Session } from "../../session/entity/session.entity";
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";

@Entity()
export class Answer {
  constructor(answer?: Partial<Answer>) {
    Object.assign(this, answer);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: true })
  value?: number;

  @Column({ nullable: true })
  question_id?: string;

  @Column({ nullable: true })
  session_id?: string;

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ nullable: true })
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => Question, (question) => question.id, { eager: true })
  @JoinColumn({ name: "question_id" })
  question?: Question;

  @ManyToOne(() => Session, (session) => session.id)
  @JoinColumn({ name: "session_id" })
  session?: Session;

  @OneToMany(() => Feedback, (feedback) => feedback.answer)
  feedback?: Feedback[];
}
