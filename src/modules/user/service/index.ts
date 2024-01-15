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

    return userRepository.find({
      relations: {
        region: { parent: { parent: { parent: { parent: true } } } },
      },
    });
  };

  static findAllAdmins = async (): Promise<User[]> => {
    const userRepository = dataSource.getRepository(User);

    return await userRepository.find({
      relations: {
        region: { parent: { parent: { parent: { parent: true } } } },
      },
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
        await userRepository.update(user_id as string, userDb);
        return;
      }
    } catch (err) {
      throw new Error("Current password wrong.");
    }

    const { name, email, role, region_id } = newUser;
    await userRepository.update(user_id as string, {
      name,
      email,
      role,
      region_id,
    });
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
