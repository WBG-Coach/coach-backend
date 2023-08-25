import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { School } from "../../school/entity/school.entity";

@Entity()
export class Coach {
  constructor(coach?: Partial<Coach>) {
    Object.assign(this, coach);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  surname?: string;

  @Column({ nullable: true })
  image_id?: string;

  @Column({ nullable: true })
  school_id?: string;

  @ManyToOne(() => School, (school) => school.id)
  @JoinColumn({ name: "school_id" })
  school?: School;

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ nullable: true })
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;
}
