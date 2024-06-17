import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Region } from "../../region/entity/region.entity";

@Entity()
export class User {
  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true, default: "admin" })
  role?: string;

  @Column({ nullable: false, unique: true })
  email?: string;

  @Column({ nullable: true })
  region_id?: string;

  @Column({ default: false })
  force_logout?: boolean;

  @ManyToOne(() => Region, (region) => region.id)
  @JoinColumn({ name: "region_id" })
  region?: Region;

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ nullable: true })
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;
}
