import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Competence } from "../../competencies/entity/competence.entity";

@Entity()
export class Question {
  constructor(question?: Partial<Question>) {
    Object.assign(this, question);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  tooltip_data?: string;

  @Column({ nullable: true })
  type?: string;

  @Column({ nullable: true })
  competence_id?: string;

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
