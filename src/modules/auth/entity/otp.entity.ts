import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Otp {
  constructor(otp?: Partial<Otp>) {
    Object.assign(this, otp);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  code?: string;

  @Column({ default: false })
  used?: boolean;

  @Column()
  email?: string;

  @Column({ type: "bigint" })
  created_at?: number;
}
