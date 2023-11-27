import { DeleteResult, UpdateResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { Region } from "../entity/region.entity";
import { School } from "../../school/entity/school.entity";

export class RegionService {
  static create = async (data: Region): Promise<Region> => {
    const regionRepository = await dataSource.getRepository(Region);

    return regionRepository.save(data);
  };

  static update = async (
    id: string,
    { name }: Region
  ): Promise<UpdateResult> => {
    const regionRepository = await dataSource.getRepository(Region);

    return regionRepository.update(id, { name });
  };

  static delete = async (id: string): Promise<DeleteResult> => {
    const schoolRepository = await dataSource.getRepository(Region);

    return schoolRepository.delete(id);
  };

  static findAll = async (): Promise<Region[]> => {
    const regionRepository = await dataSource.getRepository(Region);

    return regionRepository
      .createQueryBuilder("region")
      .leftJoinAndSelect(School, "school", "school.region_id = region.id")
      .loadRelationCountAndMap("region.schoolsCount", "region.schools")
      .getMany();
  };
}
