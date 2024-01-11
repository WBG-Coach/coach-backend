import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CoachSchool } from "./coach-school.entity";

@Entity()
export class Coach {
  constructor(coach?: Partial<Coach>) {
    Object.assign(this, coach);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  surname?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  pin?: string;

  @Column({ nullable: true })
  nin?: string;

  @Column({ nullable: true })
  birthdate?: Date;

  @Column({ nullable: true })
  image_id?: string;

  @OneToMany(() => CoachSchool, (coachSchool) => coachSchool.coach)
  coachSchools?: CoachSchool[];

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ nullable: true })
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;
}
