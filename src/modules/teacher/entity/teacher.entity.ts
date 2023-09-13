import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher {
  constructor(teacher?: Partial<Teacher>) {
    Object.assign(this, teacher);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  surname?: string;

  @Column({ nullable: true })
  birthdate?: Date;

  @Column({ nullable: true })
  subject?: string;

  @Column({ nullable: true })
  school_id?: string;

  @Column({ nullable: true })
  image_id?: string;

  @Column({ nullable: true })
  emis_number?: string;

  @Column({ nullable: true })
  pin?: string;

  @Column({ nullable: true })
  nin?: string;

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ nullable: true })
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;
}
