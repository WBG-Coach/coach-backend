import { DeleteResult, UpdateResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { Answer } from "../entity/answer.entity";

export class AnswerService {
  static create = async (data: Answer): Promise<Answer> => {
    const imageRepository = await dataSource.getRepository(Answer);

    return imageRepository.save(data);
  };

  static update = async (id: string, data: Answer): Promise<UpdateResult> => {
    const imageRepository = await dataSource.getRepository(Answer);

    return imageRepository.update(id, data);
  };

  static delete = async (id: string): Promise<DeleteResult> => {
    const imageRepository = await dataSource.getRepository(Answer);

    return imageRepository.delete(id);
  };

  static findByID = async (id: string): Promise<Answer | null> => {
    const imageRepository = await dataSource.getRepository(Answer);

    return imageRepository.findOne({ where: { id } });
  };

  static findAll = async (): Promise<Answer[]> => {
    const imageRepository = await dataSource.getRepository(Answer);

    return imageRepository.find();
  };
}
