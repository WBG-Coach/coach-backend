import { DeleteResult, UpdateResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { Coach } from "../entity/coach.entity";

export class CoachService {
  static create = async (data: Coach): Promise<Coach> => {
    const userRepository = await dataSource.getRepository(Coach);

    if (!data.email) {
      throw Error("Email is required");
    }

    if (await userRepository.exist({ where: { email: data.email } })) {
      throw Error("Exists a coach with this email");
    }

    return userRepository.save(data);
  };

  static update = async (
    id: string,
    { name, surname, email, phone, birthdate, nin, pin }: Coach
  ): Promise<UpdateResult> => {
    const userRepository = await dataSource.getRepository(Coach);

    return userRepository.update(id, {
      name,
      surname,
      email,
      phone,
      birthdate,
      nin,
      pin,
    });
  };

  static delete = async (id: string): Promise<DeleteResult> => {
    const userRepository = await dataSource.getRepository(Coach);

    return userRepository.delete(id);
  };

  static findByID = async (id: string): Promise<Coach | null> => {
    const userRepository = await dataSource.getRepository(Coach);

    return userRepository.findOne({ where: { id } });
  };

  static findByEmail = async (email: string): Promise<Coach | null> => {
    const userRepository = await dataSource.getRepository(Coach);

    return userRepository.findOne({
      where: { email },
      relations: {
        coachSchools: { school: true },
        sessions: { feedback: true, answers: true },
      },
    });
  };

  static findAll = async (): Promise<Coach[]> => {
    const userRepository = await dataSource.getRepository(Coach);

    return userRepository.find({
      relations: { sessions: { teacher: true, school: true } },
    });
  };
}
