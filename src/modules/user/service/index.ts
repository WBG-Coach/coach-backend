import dataSource from "../../../database/config/ormconfig";
import { User } from "../entity";

export class UserService {
  static findUserByID = async (id: number): Promise<User | null> => {
    const userRepository = await dataSource.getRepository(User);

    return userRepository.findOne({ where: { id } });
  };

  static findUserByEmail = async (email: string): Promise<User | null> => {
    const userRepository = await dataSource.getRepository(User);

    return userRepository.findOne({ where: { email } });
  };
}
