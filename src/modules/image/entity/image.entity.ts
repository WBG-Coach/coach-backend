import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image {
  constructor(guide?: Partial<Image>) {
    Object.assign(this, guide);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name?: string;

  @Column()
  data?: string;
}
