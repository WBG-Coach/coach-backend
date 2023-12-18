import { DeleteResult, IsNull, MoreThan } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { Region } from "../entity/region.entity";

export class RegionService {
  static createAndUpdate = async ({
    id,
    name,
    children,
  }: Region): Promise<Region | null> => {
    const regionRepository = await dataSource.getTreeRepository(Region);

    const region = await regionRepository.save({
      id,
      name,
      children,
    });

    await regionRepository.delete({
      parent: { id: IsNull() },
      level: MoreThan(0),
    });

    return region;
  };

  static findOrCreateLeafRegionByNamePath = async (
    path: string[],
    father?: Region
  ): Promise<Region | undefined> => {
    const regionRepository = await dataSource.getTreeRepository(Region);
    const [currentRegion, ...children] = path;

    if (!currentRegion) return father;

    if (!father) {
      const root = await regionRepository.findOne({
        where: { name: currentRegion, parent: IsNull() },
      });

      if (root) {
        return this.findOrCreateLeafRegionByNamePath(children, root);
      } else {
        const newRegion = await regionRepository.save({ name: currentRegion });
        if (children.length > 0)
          return this.findOrCreateLeafRegionByNamePath(children, newRegion);

        return newRegion;
      }
    } else {
      const branch = await regionRepository.findOne({
        where: { name: currentRegion, parent: { id: father.id } },
      });

      if (branch) {
        return this.findOrCreateLeafRegionByNamePath(children, branch);
      } else {
        const newRegion = await regionRepository.save({
          name: currentRegion,
          parent: { id: father.id },
        });
        if (children.length > 0)
          return this.findOrCreateLeafRegionByNamePath(children, newRegion);

        return newRegion;
      }
    }
  };

  static delete = async (id: string): Promise<DeleteResult> => {
    const regionRepository = await dataSource.getTreeRepository(Region);

    return regionRepository.delete(id);
  };

  static findById = async (id: string): Promise<Region | null> => {
    const regionRepository = await dataSource.getTreeRepository(Region);
    const region = await regionRepository.findOneBy({ id });
    return {
      ...region,
      ...(await regionRepository.findDescendantsTree({ id })),
    };
  };

  static findAllTrees = async (): Promise<Region[]> => {
    const regionRepository = await dataSource.getTreeRepository(Region);

    return regionRepository.findTrees();
  };

  static countSchools = async (root: Region): Promise<number> => {
    const regionRepository = await dataSource.getTreeRepository(Region);
    const children = await regionRepository.findDescendants(root, {
      relations: ["schools"],
    });

    return children.reduce(
      (sum: number, region: Region): number =>
        sum + (region.schools?.length || 0),
      0
    );
  };

  static findAll = async (): Promise<Region[]> => {
    const regionRepository = await dataSource.getTreeRepository(Region);

    const roots = await regionRepository.findRoots();

    return Promise.all(
      roots.map(async (region): Promise<Region> => {
        return { ...region, schoolsCount: await this.countSchools(region) };
      })
    );
  };

  static getParents = async (region_id: string): Promise<Region[]> => {
    const regionRepository = await dataSource.getTreeRepository(Region);

    return regionRepository.findAncestors({ id: region_id });
  };

  static getChildren = async (region_id: string): Promise<Region[]> => {
    const regionRepository = await dataSource.getTreeRepository(Region);

    return regionRepository.findDescendants({ id: region_id });
  };
}
