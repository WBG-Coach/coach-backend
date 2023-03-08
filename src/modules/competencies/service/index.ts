import { DeleteResult, UpdateResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { Competence } from "../entity/competence.entity";

export class CompetenceService {
  static create = async (data: Competence): Promise<Competence> => {
    const userRepository = await dataSource.getRepository(Competence);

    return userRepository.save(data);
  };

  static update = async (
    id: string,
    data: Competence
  ): Promise<UpdateResult> => {
    const userRepository = await dataSource.getRepository(Competence);

    return userRepository.update(id, data);
  };

  static delete = async (id: string): Promise<DeleteResult> => {
    const userRepository = await dataSource.getRepository(Competence);

    return userRepository.delete(id);
  };

  static findByID = async (id: string): Promise<Competence | null> => {
    const userRepository = await dataSource.getRepository(Competence);

    return userRepository.findOne({ where: { id } });
  };

  static findAll = async (): Promise<Competence[]> => {
    const userRepository = await dataSource.getRepository(Competence);

    return userRepository.find();
  };
}
