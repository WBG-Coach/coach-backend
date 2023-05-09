import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entity";

@Entity()
export class School {
  constructor(school?: Partial<School>) {
    Object.assign(this, school);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name?: string;

  @OneToMany(() => User, (user) => user.school)
  coaches?: User[];

  @Column()
  created_at?: Date;

  @Column()
  updated_at?: Date;

  @Column()
  deleted_at?: Date;
}
