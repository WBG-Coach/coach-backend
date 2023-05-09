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

  @Column()
  title?: string;

  @Column()
  description?: string;

  @Column()
  tooltip_data?: string;

  @Column()
  type?: string;

  @Column()
  competence_id?: string;

  @ManyToOne(() => Competence, (competence) => competence.id)
  @JoinColumn({ name: "competence_id" })
  competence?: Competence;
}
