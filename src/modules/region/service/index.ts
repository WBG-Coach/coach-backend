import { DeleteResult, IsNull, UpdateResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { Region } from "../entity/region.entity";

export class RegionService {
  static create = async (data: Region): Promise<Region> => {
    const regionRepository = await dataSource.getRepository(Region);

    return regionRepository.save(data);
  };

  static update = async (
    id: string,
    { name, children }: Region
  ): Promise<any | null> => {
    const regionRepository = await dataSource.getRepository(Region);

    return regionRepository.save({ id, name, children });
  };

  static delete = async (id: string): Promise<DeleteResult> => {
    const regionRepository = await dataSource.getRepository(Region);

    return regionRepository.delete(id);
  };

  static findById = async (id: string): Promise<Region | null> => {
    const regionRepository = await dataSource.getRepository(Region);

    return regionRepository.findOne({
      where: { id },
      relations: { parent: true, children: { children: true } },
      order: {
        name: "ASC",
        children: { name: "ASC", children: { name: "ASC" } },
      },
    });
  };

  static findByParentId = async (parent_id?: string): Promise<Region[]> => {
    const regionRepository = await dataSource.getRepository(Region);

    if (parent_id) {
      return regionRepository.find({
        where: { parent_id },
        relations: { children: true },
        order: { name: "ASC" },
      });
    } else {
      return regionRepository.find({
        where: { parent_id: IsNull() },
        relations: { children: true },
        order: { name: "ASC" },
      });
    }
  };

  static findAll = async (): Promise<Region[]> => {
    const regionRepository = await dataSource.getRepository(Region);

    return regionRepository.find({
      where: { parent_id: IsNull() },
      relations: { children: true },
      order: { name: "ASC" },
    });
  };
}
