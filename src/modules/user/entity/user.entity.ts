import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import config from "../../../config";
import Encryption from "../../encryption/controller";

@Entity()
export class User {
  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true, default: "analist" })
  role?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  created_at?: Date;

  @Column({ nullable: true })
  updated_at?: Date;

  @Column({ nullable: true })
  deleted_at?: Date;

  async verifyIsSamePassword(password: string): Promise<void> {
    const hash = await Encryption.encrypt(password, config.salt).catch(
      (error) => Promise.reject(error)
    );
    if (hash === this.password) return Promise.resolve();
    return Promise.reject();
  }

  @BeforeInsert()
  async hashPassword() {
    const newPassword = await Encryption.encrypt(
      this.password as string,
      config.salt
    ).catch((error) => Promise.reject(error));

    this.password = newPassword;
  }
}
