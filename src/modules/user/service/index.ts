import dataSource from "../../../database/config/ormconfig";
import { User } from "../entity";

export class UserService {
  static findUserByID = async (id: string): Promise<User | null> => {
    const userRepository = await dataSource.getRepository(User);

    return userRepository.findOne({ where: { id } });
  };

  static findAllCoaches = async (): Promise<User[]> => {
    const userRepository = await dataSource.getRepository(User);

    return userRepository.find({ where: { type: undefined } });
  };

  static findAllAdmins = async (): Promise<User[]> => {
    const userRepository = dataSource.getRepository(User);

    return await userRepository.find({ where: { type: undefined } });
  };

  static findUserByEmail = async (email: string): Promise<User | null> => {
    const userRepository = await dataSource.getRepository(User);

    return userRepository.findOne({ where: { email } });
  };
}
