import dataSource from "../../../database/config/ormconfig";
import { DataSync } from "../../sync/controller/types";
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

  static sync = async (changes: DataSync<User>): Promise<void> => {
    const repository = await dataSource.getRepository(User);

    await Promise.all(
      changes.created.map(
        async (item) =>
          await repository.save({ ...item, createdAt: new Date() })
      )
    );

    await Promise.all(
      changes.created.map(
        async (item) =>
          item.id &&
          (await repository.update(item.id, { ...item, updatedAt: new Date() }))
      )
    );

    await Promise.all(
      changes.created.map(
        async (item) =>
          item.id &&
          (await repository.update(item.id, { ...item, deletedAt: new Date() }))
      )
    );
  };
}
