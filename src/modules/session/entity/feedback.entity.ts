import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Session } from "./session.entity";
import { Competence } from "../../competencies/entity/competence.entity";

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
  session_id?: string;

  @Column({ nullable: true })
  competence_id?: string;

  @ManyToOne(() => Session, (session) => session.id)
  @JoinColumn({ name: "session_id" })
  session?: Session;

  @ManyToOne(() => Competence, (competence) => competence.id)
  @JoinColumn({ name: "competence_id" })
  competence?: Competence;

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ nullable: true })
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;
}
