import { DeleteResult, UpdateResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { School } from "../entity/school.entity";
import { DataSync } from "../../sync/controller/types";

export class SchoolService {
  static create = async (data: School): Promise<School> => {
    const schoolRepository = await dataSource.getRepository(School);

    return schoolRepository.save(data);
  };

  static update = async (id: string, data: School): Promise<UpdateResult> => {
    const schoolRepository = await dataSource.getRepository(School);

    return schoolRepository.update(id, data);
  };

  static delete = async (id: string): Promise<DeleteResult> => {
    const schoolRepository = await dataSource.getRepository(School);

    return schoolRepository.delete(id);
  };

  static findByID = async (id: string): Promise<School | null> => {
    const schoolRepository = await dataSource.getRepository(School);

    return schoolRepository.findOne({ where: { id } });
  };

  static findAll = async (): Promise<School[]> => {
    const schoolRepository = await dataSource.getRepository(School);

    return schoolRepository.find();
  };

  static sync = async (changes: DataSync<School>): Promise<void> => {
    const repository = await dataSource.getRepository(School);

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
