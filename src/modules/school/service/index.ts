import { DeleteResult, UpdateResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { School } from "../entity/school.entity";

export class SchoolService {
  static create = async (data: School): Promise<School> => {
    const userRepository = await dataSource.getRepository(School);

    return userRepository.save(data);
  };

  static update = async (id: string, data: School): Promise<UpdateResult> => {
    const userRepository = await dataSource.getRepository(School);

    return userRepository.update(id, data);
  };

  static delete = async (id: string): Promise<DeleteResult> => {
    const userRepository = await dataSource.getRepository(School);

    return userRepository.delete(id);
  };

  static findByID = async (id: string): Promise<School | null> => {
    const userRepository = await dataSource.getRepository(School);

    return userRepository.findOne({ where: { id } });
  };

  static findAll = async (): Promise<School[]> => {
    const userRepository = await dataSource.getRepository(School);

    return userRepository.find();
  };
}
