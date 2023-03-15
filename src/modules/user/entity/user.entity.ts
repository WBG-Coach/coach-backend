import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import config from "../../../config";
import Encryption from "../../encryption/controller";

@Entity()
export class User {
  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name?: string;

  @Column()
  email?: string;

  @Column()
  password?: string;

  async verifyIsSamePassword(password: string): Promise<void> {
    const hash = await Encryption.encrypt(password, config.salt).catch(
      (error) => Promise.reject(error)
    );

    console.log({ hash });
    if (hash === this.password) return Promise.resolve();
    return Promise.reject();
  }
}
