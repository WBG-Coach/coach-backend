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
import { Answer } from "../../answer/entity/answer.entity";
import { Coach } from "../../coach/entity/coach.entity";
import { Feedback } from "./feedback.entity";

@Entity()
export class Session {
  constructor(session?: Partial<Session>) {
    Object.assign(this, session);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: true })
  session_status?: string;

  @Column({ nullable: true, type: "uuid" })
  feedback_id?: string;

  @Column({ nullable: true })
  students_count?: string;

  @Column({ nullable: true })
  subject?: string;

  @Column({ nullable: true })
  lesson_time?: string;

  @Column({ nullable: true })
  objective?: string;

  @Column({ nullable: true })
  key_points?: string;

  @Column({ nullable: true })
  applicationDate?: Date;

  @Column({ nullable: true })
  coach_id?: string;

  @Column({ nullable: true })
  school_id?: string;

  @Column({ nullable: true })
  teacher_id?: string;

  @Column({ nullable: true, type: "float8" })
  latitude?: number;

  @Column({ nullable: true, type: "float8" })
  longitude?: number;

  @ManyToOne(() => Coach, (coach: Coach) => coach.id)
  @JoinColumn({ name: "coach_id" })
  coach?: Coach;

  @ManyToOne(() => School, (school) => school.id)
  @JoinColumn({ name: "school_id" })
  school?: School;

  @ManyToOne(() => Teacher, (teacher) => teacher.id)
  @JoinColumn({ name: "teacher_id" })
  teacher?: Teacher;

  @ManyToOne(() => Feedback, (feedback: Feedback) => feedback.id)
  @JoinColumn({ name: "feedback_id" })
  feedback?: Feedback;

  @OneToMany(() => Answer, (answer) => answer.session)
  answers?: Answer[];

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ nullable: true })
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;
}
