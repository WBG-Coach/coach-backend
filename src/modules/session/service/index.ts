import { DeleteResult, UpdateResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { Session } from "../entity/session.entity";
import { DataSync } from "../../sync/controller/types";

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

  static sync = async (changes: DataSync<Session>): Promise<void> => {
    const repository = await dataSource.getRepository(Session);

    await Promise.all(
      changes.created.map(
        async (item) =>
          await repository.save({ ...item, createdAt: new Date() })
      )
    );

    await Promise.all(
      changes.created.map(
        async (item) =>
          item.id &&
          (await repository.update(item.id, { ...item, updatedAt: new Date() }))
      )
    );

    await Promise.all(
      changes.created.map(
        async (item) =>
          item.id &&
          (await repository.update(item.id, { ...item, deletedAt: new Date() }))
      )
    );
  };
}
