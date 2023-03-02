import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher {
  constructor(teacher?: Partial<Teacher>) {
    Object.assign(this, teacher);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: number;

  @Column()
  name?: string;
}
