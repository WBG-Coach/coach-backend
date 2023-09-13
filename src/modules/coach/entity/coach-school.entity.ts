import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { School } from "../../school/entity/school.entity";
import { Coach } from "./coach.entity";

@Entity()
export class CoachSchool {
  constructor(coach?: Partial<CoachSchool>) {
    Object.assign(this, coach);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  school_id?: string;

  @Column()
  coach_id?: string;

  @ManyToOne(() => School, (school) => school.id)
  @JoinColumn({ name: "school_id" })
  school?: School;

  @ManyToOne(() => Coach, (coach) => coach.id)
  @JoinColumn({ name: "coach_id" })
  coach?: Coach;

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ nullable: true })
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;
}
