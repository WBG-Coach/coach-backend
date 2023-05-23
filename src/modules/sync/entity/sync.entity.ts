import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sync {
  constructor(guide?: Partial<Sync>) {
    Object.assign(this, guide);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: true })
  model?: string;

  @Column({ nullable: true })
  deviceId?: string;

  @Column({ nullable: true })
  apiLevel?: number;

  @Column({ nullable: true })
  lastPulledAt?: Date;

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ nullable: true })
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;
}
