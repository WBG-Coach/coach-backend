import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Session } from "./session.entity";

@Entity()
export class Documentation {
  constructor(documentation?: Partial<Documentation>) {
    Object.assign(this, documentation);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: number;

  @Column()
  value?: string;

  @ManyToOne(() => Session, (session) => session.id)
  @JoinColumn({ name: "session_id" })
  session?: Session;
}
