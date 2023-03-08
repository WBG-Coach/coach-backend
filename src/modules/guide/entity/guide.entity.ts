import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Guide {
  constructor(guide?: Partial<Guide>) {
    Object.assign(this, guide);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  content?: string;
}
