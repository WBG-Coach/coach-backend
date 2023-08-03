import { In } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { User } from "../entity";

export class UserService {
  static findUserByID = async (id: string): Promise<User | null> => {
    const userRepository = await dataSource.getRepository(User);

    return userRepository.findOne({ where: { id } });
  };

  static findAllUsers = async (): Promise<User[]> => {
    const userRepository = await dataSource.getRepository(User);

    return userRepository.find();
  };

  static findAllAdmins = async (): Promise<User[]> => {
    const userRepository = dataSource.getRepository(User);

    return await userRepository.find({
      where: { role: In(["admin", "analist"]) },
    });
  };

  static findUserByEmail = async (email: string): Promise<User | null> => {
    const userRepository = dataSource.getRepository(User);

    return userRepository.findOne({ where: { email } });
  };

  static updateAdmin = async (
    user_id: User["id"],
    newUser: Partial<User & { currentPassword?: string }>
  ): Promise<void> => {
    const userRepository = dataSource.getRepository(User);
    try {
      if (!!newUser.currentPassword) {
        const userDb = await userRepository.findOne({ where: { id: user_id } });
        if (!userDb) throw new Error("User not found");
        await userDb.verifyIsSamePassword(newUser.currentPassword);
        userDb.password = newUser.password;
        await userRepository.update(user_id as string, userDb);
        return;
      }
    } catch (err) {
      throw new Error("Current password wrong.");
    }

    await userRepository.update(user_id as string, newUser);
  };

  static signUpAdmin = async (newUser: Partial<User>): Promise<User> => {
    const userRepository = dataSource.getRepository(User);
    return await userRepository.save(userRepository.create(newUser));
  };

  static removeAdmin = async (id: User["id"]): Promise<void> => {
    const userRepository = dataSource.getRepository(User);
    await userRepository.delete({ id });
    return;
  };
}
