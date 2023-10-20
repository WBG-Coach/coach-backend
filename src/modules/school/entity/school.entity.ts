import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CoachSchool } from "../../coach/entity/coach-school.entity";
import { Teacher } from "../../teacher/entity/teacher.entity";

@Entity()
export class School {
  constructor(school?: Partial<School>) {
    Object.assign(this, school);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  region?: "EASTERN" | "NORTHERN" | "NORTH WESTERN" | "WESTERN" | "SOUTHERN";

  @Column({ nullable: true })
  district?: string;

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
