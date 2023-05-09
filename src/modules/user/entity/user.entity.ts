import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import config from "../../../config";
import Encryption from "../../encryption/controller";
import { School } from "../../school/entity/school.entity";
import { Teacher } from "../../teacher/entity/teacher.entity";

@Entity()
export class User {
  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name?: string;

  @Column()
  type?: string;

  @Column()
  email?: string;

  @Column()
  password?: string;

  @Column()
  school_id?: string;

  @Column()
  created_at?: Date;

  @Column()
  updated_at?: Date;

  @Column()
  deleted_at?: Date;

  @OneToMany(() => Teacher, (teacher) => teacher.coach)
  teachers?: Teacher[];

  @ManyToOne(() => School, (school) => school.id)
  @JoinColumn({ name: "school_id" })
  school?: School;

  async verifyIsSamePassword(password: string): Promise<void> {
    const hash = await Encryption.encrypt(password, config.salt).catch(
      (error) => Promise.reject(error)
    );
    if (hash === this.password) return Promise.resolve();
    return Promise.reject();
  }
}
