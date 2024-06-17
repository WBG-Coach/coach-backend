import { Teacher } from "../../teacher/entity/teacher.entity";
import dataSource from "../../../database/config/ormconfig";
import { Log } from "../entity";
import { User } from "../../user/entity";

export class LogsService {
  static findAll = async (): Promise<Teacher[]> => {
    const userRepository = await dataSource.getRepository(Log);

    return userRepository.find({ take: 50 });
  };

  static create = async (user: User, description: string) => {
    const repository = await dataSource.getRepository(Log);

    await repository.save({
      user_id: user.id,
      description,
      created_at: new Date().toJSON(),
    });
  };
}
