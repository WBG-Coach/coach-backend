import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../user/entity";

@Entity()
export class Teacher {
  constructor(teacher?: Partial<Teacher>) {
    Object.assign(this, teacher);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name?: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "coach_id" })
  coach?: User;
}
