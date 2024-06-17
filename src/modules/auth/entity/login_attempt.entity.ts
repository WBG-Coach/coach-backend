import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class LoginAttempt {
  constructor(otp?: Partial<LoginAttempt>) {
    Object.assign(this, otp);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  email?: string;

  @Column({ type: "bigint" })
  created_at?: number;
}
