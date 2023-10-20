import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Answer } from "../../answer/entity/answer.entity";

@Entity()
export class Feedback {
  constructor(feedback?: Partial<Feedback>) {
    Object.assign(this, feedback);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: number;

  @Column({ nullable: true })
  value?: string;

  @Column({ nullable: true })
  answer_id?: string;

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ nullable: true })
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => Answer, (answer) => answer.id)
  @JoinColumn({ name: "answer_id" })
  answer?: Answer;
}
