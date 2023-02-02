import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import config from "../../../config";
import Encryption from "../../encryption/controller";

@Entity()
export class User {
  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  email?: string;

  @Column()
  password?: string;

  async verifyIsSamePassword(password: string): Promise<void> {
    const hash = await Encryption.encrypt(password, config.secret).catch(
      (error) => Promise.reject(error)
    );
    if (hash === this.password) return Promise.resolve();
    return Promise.reject();
  }
}
