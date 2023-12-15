import { DeleteResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { School } from "../entity/school.entity";
import crypto from "crypto";
import config from "../../../config";
import { Region } from "../../region/entity/region.entity";

const algorithm = "aes-256-ecb";

export class SchoolService {
  static create = async (data: School): Promise<School> => {
    const schoolRepository = await dataSource.getRepository(School);

    return schoolRepository.save(data);
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

  static findAll = async (): Promise<School[]> => {
    const schoolRepository = await dataSource.getRepository(School);

    return schoolRepository.find({
      relations: {
        region: {
          parent: { parent: { parent: { parent: { parent: true } } } },
        },
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
