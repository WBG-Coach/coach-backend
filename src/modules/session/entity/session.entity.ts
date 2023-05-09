import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { School } from "../../school/entity/school.entity";
import { Teacher } from "../../teacher/entity/teacher.entity";
import { User } from "../../user/entity";
import { Answer } from "../../answer/entity/answer.entity";

@Entity()
export class Session {
  constructor(session?: Partial<Session>) {
    Object.assign(this, session);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  session_status?: string;

  @Column()
  boys_count?: string;

  @Column()
  girls_count?: string;

  @Column()
  subject?: string;

  @Column()
  lesson_time?: string;

  @Column()
  objective?: string;

  @Column()
  keyPoints?: string;

  @Column()
  applicationDate?: Date;

  @Column()
  coach_id?: string;

  @Column()
  school_id?: string;

  @Column()
  teacher_id?: string;

  @ManyToOne(() => User, (coach: User) => coach.id)
  @JoinColumn({ name: "coach_id" })
  coach?: User;

  @ManyToOne(() => School, (school) => school.id)
  @JoinColumn({ name: "school_id" })
  school?: School;

  @ManyToOne(() => Teacher, (teacher) => teacher.id)
  @JoinColumn({ name: "teacher_id" })
  teacher?: Teacher;

  @OneToMany(() => Answer, (answer) => answer.session)
  answers?: Answer[];

  @Column()
  created_at?: Date;

  @Column()
  updated_at?: Date;

  @Column()
  deleted_at?: Date;
}
