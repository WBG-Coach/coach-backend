import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Questionnaire } from "../../questionnaire/entity/questionnaire.entity";
import { School } from "../../school/entity/school.entity";
import { Teacher } from "../../teacher/entity/teacher.entity";
import { User } from "../../user/entity";

@Entity()
export class Session {
  constructor(session?: Partial<Session>) {
    Object.assign(this, session);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: number;

  @Column()
  status?: string;

  @Column()
  applicationDate?: Date;

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.id)
  @JoinColumn({ name: "questionnaire_id" })
  questionnaire?: Questionnaire;

  @ManyToOne(() => User, (coach) => coach.id)
  @JoinColumn({ name: "coach_id" })
  coache?: User;

  @ManyToOne(() => School, (school) => school.id)
  @JoinColumn({ name: "school_id" })
  school?: School;

  @ManyToOne(() => Teacher, (teacher) => teacher.id)
  @JoinColumn({ name: "teacher_id" })
  teacher?: Teacher;
}
