import { DeleteResult, UpdateResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { Coach } from "../entity/coach.entity";

export class CoachService {
  static create = async (data: Coach): Promise<Coach> => {
    const userRepository = await dataSource.getRepository(Coach);

    return userRepository.save(data);
  };

  static update = async (id: string, data: Coach): Promise<UpdateResult> => {
    const userRepository = await dataSource.getRepository(Coach);

    return userRepository.update(id, data);
  };

  static delete = async (id: string): Promise<DeleteResult> => {
    const userRepository = await dataSource.getRepository(Coach);

    return userRepository.delete(id);
  };

  static findByID = async (id: string): Promise<Coach | null> => {
    const userRepository = await dataSource.getRepository(Coach);

    return userRepository.findOne({ where: { id } });
  };

  static findByEmail = async (email: string): Promise<Coach | null> => {
    const userRepository = await dataSource.getRepository(Coach);

    return userRepository.findOne({ where: { email } });
  };

  static findAll = async (): Promise<Coach[]> => {
    const userRepository = await dataSource.getRepository(Coach);

    return userRepository.find({ relations: { coachSchools: true } });
  };
}
