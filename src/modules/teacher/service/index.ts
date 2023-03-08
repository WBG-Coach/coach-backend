import { DeleteResult, UpdateResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { Teacher } from "../entity/teacher.entity";

export class TeacherService {
  static create = async (data: Teacher): Promise<Teacher> => {
    const userRepository = await dataSource.getRepository(Teacher);

    return userRepository.save(data);
  };

  static update = async (id: string, data: Teacher): Promise<UpdateResult> => {
    const userRepository = await dataSource.getRepository(Teacher);

    return userRepository.update(id, data);
  };

  static delete = async (id: string): Promise<DeleteResult> => {
    const userRepository = await dataSource.getRepository(Teacher);

    return userRepository.delete(id);
  };

  static findByID = async (id: string): Promise<Teacher | null> => {
    const userRepository = await dataSource.getRepository(Teacher);

    return userRepository.findOne({ where: { id } });
  };

  static findAll = async (): Promise<Teacher[]> => {
    const userRepository = await dataSource.getRepository(Teacher);

    return userRepository.find();
  };
}
