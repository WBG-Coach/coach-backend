import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sync {
  constructor(guide?: Partial<Sync>) {
    Object.assign(this, guide);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  model?: string;

  @Column()
  deviceId?: string;

  @Column()
  apiLevel?: number;

  @Column()
  lastPulledAt?: Date;
}
