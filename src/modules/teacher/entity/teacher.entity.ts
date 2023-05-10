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

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  surname?: string;

  @Column({ nullable: true })
  emis_number?: string;

  @Column({ nullable: true })
  subject?: string;

  @Column({ nullable: true })
  birthdate?: string;

  @Column({ nullable: true })
  school_id?: string;

  @Column({ nullable: true })
  image_id?: string;

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ nullable: true })
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;
}
