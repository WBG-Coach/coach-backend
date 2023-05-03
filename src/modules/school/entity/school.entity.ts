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
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @Column()
  deletedAt?: Date;
}
