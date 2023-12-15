import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from "typeorm";
import { School } from "../../school/entity/school.entity";

@Entity()
@Tree("materialized-path")
export class Region {
  constructor(region?: Partial<Region>) {
    Object.assign(this, region);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  level?: number;

  @TreeParent({ onDelete: "CASCADE" })
  parent?: Region;

  @TreeChildren({ cascade: true })
  children?: Region[];

  @OneToMany(() => School, (school) => school.region)
  schools?: School[];

  @Column({ nullable: true })
  @UpdateDateColumn()
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;

  schoolsCount?: number;
}
