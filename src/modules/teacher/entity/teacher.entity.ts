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

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "coach_id" })
  coach?: User;

  @Column()
  name?: string;

  @Column()
  surname?: string;

  @Column()
  emis_number?: string;

  @Column()
  subject?: string;

  @Column()
  birthdate?: string;

  @Column()
  school_id?: string;

  @Column()
  coach_id?: string;

  @Column()
  image_id?: string;

  @Column()
  created_at?: Date;

  @Column()
  updated_at?: Date;

  @Column()
  deleted_at?: Date;
}
