import { EntityTarget, MoreThan, ObjectLiteral } from "typeorm";
import { Feedback } from "../../session/entity/feedback.entity";
import { Teacher } from "../../teacher/entity/teacher.entity";
import { Session } from "../../session/entity/session.entity";
import dataSource from "../../../database/config/ormconfig";
import { Answer } from "../../answer/entity/answer.entity";
import { Coach } from "../../coach/entity/coach.entity";
import { DataToSync, SyncData } from "../controller/types";
import { Image } from "../../image/entity";
import { Sync } from "../entity";
import { School } from "../../school/entity/school.entity";
import { Question } from "../../question/entity/question.entity";

export class SyncService {
  static findAll = async (): Promise<Teacher[]> => {
    const userRepository = await dataSource.getRepository(Sync);

    return userRepository.find();
  };

  static sync = async (
    { apiLevel, deviceId, lastPulledAt, model, changes, lastSync }: DataToSync,
    school: School | null
  ): Promise<SyncData> => {
    const syncRepository = await dataSource.getRepository(Sync);
    try {
      await syncRepository.save({
        apiLevel,
        deviceId,
        lastPulledAt,
        model,
      });

      await this.saveSyncByEntity(Coach, changes.coaches || []);
      await this.saveSyncByEntity(Image, changes.images || []);
      await this.saveSyncByEntity(Teacher, changes.teachers || []);
      await this.saveSyncByEntity(Session, changes.sessions || []);
      await this.saveSyncByEntity(Answer, changes.answers || []);
      await this.saveSyncByEntity(Feedback, changes.feedbacks || []);

      if (!school) {
        return {
          coaches: [],
          feedbacks: [],
          questions: [],
          schools: [],
          sessions: [],
          teachers: [],
          total: 0,
        };
      } else {
        const coaches = await this.getDataToSync(Coach, lastSync);
        const feedbacks = await this.getDataToSync(Feedback, lastSync);
        const questions = await this.getDataToSync(Question, lastSync);
        const schools = await this.getDataToSync(School, lastSync);
        const sessions = await this.getDataToSync(Session, lastSync, school);
        const teachers = await this.getDataToSync(Teacher, lastSync, school);
        return {
          coaches,
          feedbacks,
          questions,
          schools,
          sessions,
          teachers,
          total:
            coaches.length +
            feedbacks.length +
            questions.length +
            schools.length +
            sessions.length +
            teachers.length,
        };
      }
    } catch (err) {
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

  static getDataToSync = async (
    Entity: EntityTarget<ObjectLiteral>,
    lastSync?: string,
    school?: School
  ) => {
    const repository = await dataSource.getRepository(Entity);
    if (!lastSync) {
      return await repository.find(
        school ? { where: { school_id: school.id } } : undefined
      );
    } else {
      return await repository.find({
        where: [
          {
            ...(school ? { school_id: school.id } : {}),
            created_at: MoreThan(new Date(lastSync)),
          },
          {
            ...(school ? { school_id: school.id } : {}),
            updated_at: MoreThan(new Date(lastSync)),
          },
          {
            ...(school ? { school_id: school.id } : {}),
            deleted_at: MoreThan(new Date(lastSync)),
          },
        ],
      });
    }
  };
}
