import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entity";

@Entity()
export class School {
  constructor(school?: Partial<School>) {
    Object.assign(this, school);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: true })
  name?: string;

  @OneToMany(() => User, (user) => user.school)
  coaches?: User[];

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ nullable: true })
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;
}
