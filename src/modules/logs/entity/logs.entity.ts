import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../user/entity";

@Entity()
export class Log {
  constructor(guide?: Partial<Log>) {
    Object.assign(this, guide);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: false })
  user_id?: string;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: "user_id" })
  user?: User;

  @Column({ nullable: false })
  description?: string;

  @Column({ nullable: true })
  created_at?: Date;
}
