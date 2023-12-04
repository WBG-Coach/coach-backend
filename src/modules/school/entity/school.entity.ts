import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CoachSchool } from "../../coach/entity/coach-school.entity";
import { Teacher } from "../../teacher/entity/teacher.entity";
import { Region } from "../../region/entity/region.entity";

@Entity()
export class School {
  constructor(school?: Partial<School>) {
    Object.assign(this, school);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: true })
  region_id?: string;

  @ManyToOne(() => Region, (region) => region.id)
  @JoinColumn({ name: "region_id" })
  region?: Region;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  emis_number?: string;

  @Column({ nullable: true })
  created_at?: Date;

  @OneToMany(() => CoachSchool, (coachSchool) => coachSchool.school)
  coachSchools?: CoachSchool[];

  @OneToMany(() => Teacher, (teacher) => teacher.school)
  teachers?: Teacher[];

  @Column({ nullable: true })
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;
}
