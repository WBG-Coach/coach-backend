import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column({ nullable: true })
  level?: number;

  @Column({ nullable: true })
  parent_id?: string;

  @ManyToOne(() => Region, (region) => region.children, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "parent_id" })
  parent?: Region;

  @OneToMany(() => Region, (region) => region.parent, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    orphanedRowAction: "delete",
  })
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
