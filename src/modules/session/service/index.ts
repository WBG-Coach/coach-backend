import { DeleteResult, UpdateResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { Session } from "../entity/session.entity";

export class SessionService {
  static create = async (data: Session): Promise<Session> => {
    const userRepository = await dataSource.getRepository(Session);

    return userRepository.save(data);
  };

  static update = async (id: string, data: Session): Promise<UpdateResult> => {
    const userRepository = await dataSource.getRepository(Session);

    return userRepository.update(id, data);
  };

  static delete = async (id: string): Promise<DeleteResult> => {
    const userRepository = await dataSource.getRepository(Session);

    return userRepository.delete(id);
  };

  static findByID = async (id: string): Promise<Session | null> => {
    const userRepository = await dataSource.getRepository(Session);

    return userRepository.findOne({ where: { id } });
  };

  static findAll = async (): Promise<Session[]> => {
    const userRepository = await dataSource.getRepository(Session);

    return userRepository.find();
  };
}
