import { EntityTarget, ObjectLiteral } from "typeorm";
import { Feedback } from "../../session/entity/feedback.entity";
import { Teacher } from "../../teacher/entity/teacher.entity";
import { Session } from "../../session/entity/session.entity";
import dataSource from "../../../database/config/ormconfig";
import { Answer } from "../../answer/entity/answer.entity";
import { Coach } from "../../coach/entity/coach.entity";
import { DataToSync } from "../controller/types";
import { Image } from "../../image/entity";
import { Sync } from "../entity";

export class SyncService {
  static findAll = async (): Promise<Teacher[]> => {
    const userRepository = await dataSource.getRepository(Sync);

    return userRepository.find();
  };

  static sync = async ({
    apiLevel,
    deviceId,
    lastPulledAt,
    model,
    changes,
  }: DataToSync): Promise<void> => {
    const syncRepository = await dataSource.getRepository(Sync);

    try {
      await syncRepository.save({
        apiLevel,
        deviceId,
        lastPulledAt,
        model,
      });

      await this.saveSyncByEntity(Image, changes.images || []);
      await this.saveSyncByEntity(Teacher, changes.teachers || []);
      await this.saveSyncByEntity(Coach, changes.coaches || []);
      await this.saveSyncByEntity(Session, changes.sessions || []);
      await this.saveSyncByEntity(Answer, changes.answers || []);
      await this.saveSyncByEntity(Feedback, changes.feedbacks || []);
    } catch (err) {
      console.log({ err });
      throw new Error(err as any);
    }
  };

  static saveSyncByEntity = async (
    Entity: EntityTarget<ObjectLiteral>,
    changes: any[]
  ) => {
    const repository = await dataSource.getRepository(Entity);

    await Promise.all(
      changes.map(async (item) =>
        repository.save({
          ...item,
          created_at: new Date(item.created_at).toJSON(),
          updated_at: undefined,
          deleted_at: undefined,
        })
      )
    );
  };
}
