import { DeleteResult, In } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { School } from "../entity/school.entity";
import crypto from "crypto";
import config from "../../../config";
import { Region } from "../../region/entity/region.entity";
import { RegionService } from "../../region/service";

const algorithm = "aes-256-ecb";

type SchoolBatchResponse = {
  successCount: number;
  failItems: string[][];
};

export class SchoolService {
  static create = async (data: School): Promise<School> => {
    const schoolRepository = await dataSource.getRepository(School);

    return schoolRepository.save(data);
  };

  static createInBatch = async (batch: string[][]): Promise<any> => {
    const schoolRepository = await dataSource.getRepository(School);

    const response = await batch.reduce(
      async (
        acc: Promise<SchoolBatchResponse>,
        row: Array<string>
      ): Promise<SchoolBatchResponse> => {
        const oldState = await acc;
        const [emis_number, name, ...regionPath] = row;

        const region = await RegionService.findOrCreateLeafRegionByNamePath(
          regionPath
        );

        if (!region?.id) {
          return { ...oldState, failItems: [...oldState.failItems, row] };
        }

        try {
          await schoolRepository.save({
            emis_number,
            name,
            region_id: region.id,
          });
        } catch {
          return { ...oldState, failItems: [...oldState.failItems, row] };
        }

        return { ...oldState, successCount: oldState.successCount + 1 };
      },
      Promise.resolve({
        successCount: 0,
        failItems: [],
      })
    );

    return response;
  };

  static update = async (
    id: string,
    { name, emis_number, region_id }: School
  ): Promise<School> => {
    const schoolRepository = await dataSource.getRepository(School);

    return schoolRepository.save({ id, region_id, emis_number, name });
  };

  static delete = async (id: string): Promise<DeleteResult> => {
    const schoolRepository = await dataSource.getRepository(School);

    return schoolRepository.delete(id);
  };

  static findByRegionId = async (id: Region["id"]): Promise<School[]> => {
    const schoolRepository = await dataSource.getRepository(School);

    return schoolRepository.find({
      where: { region: { id } },
      order: { name: "ASC" },
      relations: {
        region: {
          parent: { parent: { parent: { parent: { parent: true } } } },
        },
      },
    });
  };

  static findByID = async (id: string): Promise<School | null> => {
    const schoolRepository = await dataSource.getRepository(School);

    return schoolRepository.findOne({
      where: { id },
      relations: {
        region: {
          parent: { parent: { parent: { parent: { parent: true } } } },
        },
      },
    });
  };

  static findAll = async (regionIds?: string[]): Promise<School[]> => {
    const schoolRepository = await dataSource.getRepository(School);
    if (!regionIds) {
      return schoolRepository.find();
    }

    return schoolRepository.find({
      where: {
        region_id: In(regionIds),
      },
    });
  };

  static encryptId = (id: string): string => {
    const cipher = crypto.createCipheriv(
      algorithm,
      Buffer.from(config.secret),
      null
    );
    let encrypted = cipher.update(id, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  };

  static decryptId = (key: string): string => {
    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(config.secret),
      null
    );
    let decrypted = decipher.update(key, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  };
}
