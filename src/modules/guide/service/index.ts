import { DeleteResult, UpdateResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { Guide } from "../entity";

export class GuideService {
  static create = async (data: Guide): Promise<Guide> => {
    const userRepository = await dataSource.getRepository(Guide);

    return userRepository.save(data);
  };

  static update = async (id: string, data: Guide): Promise<UpdateResult> => {
    const userRepository = await dataSource.getRepository(Guide);

    return userRepository.update(id, data);
  };

  static delete = async (id: string): Promise<DeleteResult> => {
    const userRepository = await dataSource.getRepository(Guide);

    return userRepository.delete(id);
  };

  static findByID = async (id: string): Promise<Guide | null> => {
    const userRepository = await dataSource.getRepository(Guide);

    return userRepository.findOne({ where: { id } });
  };

  static findAll = async (): Promise<Guide[]> => {
    const userRepository = await dataSource.getRepository(Guide);

    return userRepository.find();
  };
}
