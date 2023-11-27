import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { School } from "../../school/entity/school.entity";

@Entity()
export class Region {
  constructor(school?: Partial<Region>) {
    Object.assign(this, school);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: true })
  name?: string;

  schoolsCount?: number;

  @OneToMany(() => School, (school) => school.region)
  schools?: School[];

  @Column({ nullable: true })
  @UpdateDateColumn()
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;
}
