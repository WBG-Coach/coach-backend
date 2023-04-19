import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { School } from "../../school/entity/school.entity";
import { Answer } from "../../question/entity/answer.entity";
import { Teacher } from "../../teacher/entity/teacher.entity";
import { User } from "../../user/entity";

@Entity()
export class Session {
  constructor(session?: Partial<Session>) {
    Object.assign(this, session);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  status?: string;

  @Column()
  howManyStudents?: number;

  @Column()
  howManyBoys?: number;

  @Column()
  howManyGirls?: number;

  @Column()
  subject?: string;

  @Column()
  howLongTime?: number;

  @Column()
  objective?: string;

  @Column()
  keyPoints?: string;

  @Column()
  applicationDate?: Date;

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
}
