import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Guide } from "../../guide/entity/guide.entity";

@Entity()
export class Competence {
  constructor(competence?: Partial<Competence>) {
    Object.assign(this, competence);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: number;

  @Column()
  title?: string;

  @ManyToOne(() => Guide, (guide) => guide.id)
  @JoinColumn({ name: "guide_id" })
  guide?: Guide;
}
