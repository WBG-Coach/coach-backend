import dataSource from "../../../database/config/ormconfig";
import { Answer } from "../entity/answer.entity";
import { DataSync } from "../../sync/controller/types";

export class AnswerService {
  static sync = async (changes: DataSync<Answer>): Promise<void> => {
    const repository = await dataSource.getRepository(Answer);

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
