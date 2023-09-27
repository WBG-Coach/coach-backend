import { DeleteResult, UpdateResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { School } from "../entity/school.entity";
import crypto from "crypto";
import config from "../../../config";

const algorithm = "aes-256-ecb";

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

  static findByRegion = async (region: School["region"]): Promise<School[]> => {
    const schoolRepository = await dataSource.getRepository(School);

    return schoolRepository.find({ where: { region }, order: { name: "ASC" } });
  };

  static findByID = async (id: string): Promise<School | null> => {
    const schoolRepository = await dataSource.getRepository(School);

    return schoolRepository.findOne({ where: { id } });
  };

  static findAll = async (): Promise<School[]> => {
    const schoolRepository = await dataSource.getRepository(School);

    return schoolRepository.find({
      relations: {
        teachers: true,
        coachSchools: true,
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
