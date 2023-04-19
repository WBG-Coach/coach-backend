import { DeleteResult, UpdateResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { Question } from "../entity/question.entity";

export class QuestionService {
  static create = async (data: Question): Promise<Question> => {
    const userRepository = await dataSource.getRepository(Question);

    return userRepository.save(data);
  };

  static update = async (id: string, data: Question): Promise<UpdateResult> => {
    const userRepository = await dataSource.getRepository(Question);

    return userRepository.update(id, data);
  };

  static delete = async (id: string): Promise<DeleteResult> => {
    const userRepository = await dataSource.getRepository(Question);

    return userRepository.delete(id);
  };

  static findByID = async (id: string): Promise<Question | null> => {
    const userRepository = await dataSource.getRepository(Question);

    return userRepository.findOne({ where: { id } });
  };

  static findAll = async (): Promise<Question[]> => {
    const userRepository = await dataSource.getRepository(Question);

    return userRepository.find();
  };
}
