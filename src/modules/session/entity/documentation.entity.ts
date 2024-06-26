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

  @Column({ nullable: true })
  value?: string;

  @ManyToOne(() => Session, (session) => session.id)
  @JoinColumn({ name: "session_id" })
  session?: Session;

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ nullable: true })
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;
}
