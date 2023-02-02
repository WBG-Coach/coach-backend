import DBConnector from "../../../db-connector";
import { User } from "../entity";

export class UserService {
  static findUserByID = async (id: number): Promise<User | null> => {
    const userRepository = await DBConnector.getUserRepository();

    return userRepository.findOne({ where: { id } });
  };

  static findUserByEmail = async (email: string): Promise<User | null> => {
    const userRepository = await DBConnector.getUserRepository();

    return userRepository.findOne({ where: { email } });
  };
}
