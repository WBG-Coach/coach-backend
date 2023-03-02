import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Session } from "./session.entity";

@Entity()
export class Feedback {
  constructor(feedback?: Partial<Feedback>) {
    Object.assign(this, feedback);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: number;

  @Column()
  value?: string;

  @ManyToOne(() => Session, (session) => session.id)
  @JoinColumn({ name: "session_id" })
  session?: Session;
}
