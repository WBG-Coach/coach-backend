import {
  And,
  EntityTarget,
  IsNull,
  MoreThan,
  Not,
  ObjectLiteral,
} from "typeorm";
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

    try {
      await syncRepository.save({
        apiLevel,
        deviceId,
        lastPulledAt,
        model,
      });

      await this.saveSyncByEntity(School, changes.school);
      await this.saveSyncByEntity(User, changes.user);
      await this.saveSyncByEntity(Competence, changes.competence);
      await this.saveSyncByEntity(Question, changes.question);
      await this.saveSyncByEntity(Teacher, changes.teacher);

      await this.saveSyncByEntity(Session, changes.session);
      await this.saveSyncByEntity(Answer, changes.answer);
      await this.saveSyncByEntity(Image, changes.image);
      await this.saveSyncByEntity(Feedback, changes.feedback);
    } catch (err) {
      console.log({ err });
    }
  };

  static getSyncByEntity = async <Entity extends ObjectLiteral>(
    EntityClass: EntityTarget<Entity>,
    lastUpdate?: Date
  ) => {
    const repository = await dataSource.getRepository<any>(EntityClass);

    const select = repository.metadata.ownColumns
      .map((column) => column.propertyName)
      .filter(
        (column) => !["created_at", "updated_at", "deleted_at"].includes(column)
      );

    const created = await repository.find(
      lastUpdate
        ? {
            select,
            where: { created_at: And(Not(IsNull()), MoreThan(lastUpdate)) },
          }
        : { select, where: { created_at: Not(IsNull()) } }
    );
    const updated = await repository.find(
      lastUpdate
        ? {
            select,
            where: { updated_at: And(Not(IsNull()), MoreThan(lastUpdate)) },
          }
        : { select, where: { updated_at: Not(IsNull()) } }
    );
    const deleted = await repository.find(
      lastUpdate
        ? {
            select,
            where: { deleted_at: And(Not(IsNull()), MoreThan(lastUpdate)) },
          }
        : { select, where: { deleted_at: Not(IsNull()) } }
    );

    return { created, updated, deleted };
  };

  static saveSyncByEntity = async (
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
