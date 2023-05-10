import { EntityTarget, ObjectLiteral } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { DataSync, WatermelonData } from "../controller/types";
import { Sync } from "../entity";
import { Teacher } from "../../teacher/entity/teacher.entity";
import { Question } from "../../question/entity/question.entity";
import { Competence } from "../../competencies/entity/competence.entity";
import { User } from "../../user/entity";
import { School } from "../../school/entity/school.entity";
import { Answer } from "../../answer/entity/answer.entity";
import { Session } from "../../session/entity/session.entity";
import { Image } from "../../image/entity";
import { Feedback } from "../../session/entity/feedback.entity";

export class SyncService {
  static sync = async ({
    apiLevel,
    deviceId,
    lastPulledAt,
    model,
    changes,
  }: WatermelonData): Promise<void> => {
    const syncRepository = await dataSource.getRepository(Sync);

    console.log({ apiLevel, deviceId, lastPulledAt, model });
    try {
      await syncRepository.save({
        apiLevel,
        deviceId,
        lastPulledAt,
        model,
      });

      console.log({ lastPulledAt });

      console.log({ Session: changes.session });

      await this.syncByEntity(School, changes.school);
      await this.syncByEntity(User, changes.user);
      await this.syncByEntity(Competence, changes.competence);
      await this.syncByEntity(Question, changes.question);
      await this.syncByEntity(Teacher, changes.teacher);

      await this.syncByEntity(Session, changes.session);
      await this.syncByEntity(Answer, changes.answer);
      await this.syncByEntity(Image, changes.image);
      await this.syncByEntity(Feedback, changes.feedback);
    } catch (err) {
      console.log({ err });
    }
  };

  static syncByEntity = async (
    Entity: EntityTarget<ObjectLiteral>,
    changes: DataSync<any>
  ) => {
    const repository = await dataSource.getRepository(Entity);

    await Promise.all(
      changes.created.map(
        async (item) =>
          await repository.save({
            ...item,
            created_at: new Date(),
            updated_at: undefined,
            deleted_at: undefined,
          })
      )
    );

    await Promise.all(
      changes.updated.map(async (item) => {
        const { updated_at, created_at, deleted_at, ...otherProps } = item;
        console.log(updated_at, created_at, deleted_at);

        await repository.update(item.id, {
          ...otherProps,
          updated_at: new Date(),
        });
      })
    );

    await Promise.all(
      changes.deleted.map(
        async (item) =>
          item.id &&
          (await repository.update(item.id, {
            deleted_at: new Date(),
          }))
      )
    );
  };
}
