import { DeleteResult, UpdateResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { Questionnaire } from "../entity/questionnaire.entity";

export class QuestionnaireService {
  static create = async (data: Questionnaire): Promise<Questionnaire> => {
    const userRepository = await dataSource.getRepository(Questionnaire);

    return userRepository.save(data);
  };

  static update = async (
    id: string,
    data: Questionnaire
  ): Promise<UpdateResult> => {
    const userRepository = await dataSource.getRepository(Questionnaire);

    return userRepository.update(id, data);
  };

  static delete = async (id: string): Promise<DeleteResult> => {
    const userRepository = await dataSource.getRepository(Questionnaire);

    return userRepository.delete(id);
  };

  static findByID = async (id: string): Promise<Questionnaire | null> => {
    const userRepository = await dataSource.getRepository(Questionnaire);

    return userRepository.findOne({ where: { id } });
  };

  static findAll = async (): Promise<Questionnaire[]> => {
    const userRepository = await dataSource.getRepository(Questionnaire);

    return userRepository.find();
  };
}
