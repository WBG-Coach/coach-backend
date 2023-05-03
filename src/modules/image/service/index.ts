import { DeleteResult, UpdateResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { Image } from "../entity";

export class ImageService {
  static create = async (data: Image): Promise<Image> => {
    const imageRepository = await dataSource.getRepository(Image);

    return imageRepository.save(data);
  };

  static update = async (id: string, data: Image): Promise<UpdateResult> => {
    const imageRepository = await dataSource.getRepository(Image);

    return imageRepository.update(id, data);
  };

  static delete = async (id: string): Promise<DeleteResult> => {
    const imageRepository = await dataSource.getRepository(Image);

    return imageRepository.delete(id);
  };

  static findByID = async (id: string): Promise<Image | null> => {
    const imageRepository = await dataSource.getRepository(Image);

    return imageRepository.findOne({ where: { id } });
  };

  static findAll = async (): Promise<Image[]> => {
    const imageRepository = await dataSource.getRepository(Image);

    return imageRepository.find();
  };
}
