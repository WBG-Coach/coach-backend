import { DeleteResult, UpdateResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { Session } from "../entity/session.entity";

export class SessionService {
  static create = async (data: Session): Promise<Session> => {
    const sessionRepository = await dataSource.getRepository(Session);

    return sessionRepository.save(data);
  };

  static update = async (id: string, data: Session): Promise<UpdateResult> => {
    const sessionRepository = await dataSource.getRepository(Session);

    return sessionRepository.update(id, data);
  };

  static delete = async (id: string): Promise<DeleteResult> => {
    const sessionRepository = await dataSource.getRepository(Session);

    return sessionRepository.delete(id);
  };

  static findByID = async (id: string): Promise<Session | null> => {
    const sessionRepository = await dataSource.getRepository(Session);

    return sessionRepository.findOne({ where: { id } });
  };

  static findAll = async (): Promise<Session[]> => {
    const sessionRepository = await dataSource.getRepository(Session);

    return sessionRepository.find();
  };
}
