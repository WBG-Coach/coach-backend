import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class School {
  constructor(school?: Partial<School>) {
    Object.assign(this, school);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: number;

  @Column()
  name?: string;
}
