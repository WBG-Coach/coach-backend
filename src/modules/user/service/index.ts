import dataSource from "../../../database/config/ormconfig";
import { User } from "../entity";

export class UserService {
  static findUserByID = async (id: string): Promise<User | null> => {
    const userRepository = await dataSource.getRepository(User);

    return userRepository.findOne({ where: { id } });
  };

  static findAll = async (): Promise<User[]> => {
    const userRepository = await dataSource.getRepository(User);

    return userRepository.find();
  };

  static findUserByEmail = async (email: string): Promise<User | null> => {
    const userRepository = await dataSource.getRepository(User);

    return userRepository.findOne({ where: { email } });
  };
}
