import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Guide } from "../../guide/entity/guide.entity";

@Entity()
export class Questionnaire {
  constructor(questionnaire?: Partial<Questionnaire>) {
    Object.assign(this, questionnaire);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: number;

  @Column()
  title?: string;

  @Column()
  active?: boolean;
}
