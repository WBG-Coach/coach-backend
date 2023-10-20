import { EntityTarget, In, MoreThan, ObjectLiteral } from "typeorm";
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
import { CoachSchool } from "../../coach/entity/coach-school.entity";

export class SyncService {
  static findAll = async (): Promise<Teacher[]> => {
    const userRepository = await dataSource.getRepository(Sync);

    return userRepository.find();
  };

  static sync = async (
    { apiLevel, deviceId, lastPulledAt, model, changes, lastSync }: DataToSync,
    school: School
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
      await this.saveSyncByEntity(CoachSchool, changes.coachSchools || []);
      await this.saveSyncByEntity(Image, changes.images || []);
      await this.saveSyncByEntity(Teacher, changes.teachers || []);
      await this.saveSyncByEntity(Session, changes.sessions || []);
      await this.saveSyncByEntity(Answer, changes.answers || []);
      await this.saveSyncByEntity(Feedback, changes.feedbacks || []);

      const questions = await this.getDataToSync(Question, lastSync);
      const { coaches, coachSchools } = await this.getCoachDataToSync(school);
      const teachers = await this.getDataToSync(Teacher, undefined, school);
      const sessions = await this.getDataToSync(Session, lastSync, school);
      const answers = await this.getAnswerToSync(sessions);
      const feedbacks = await this.getFeedbackToSync(school, lastSync);

      return {
        coaches,
        coachSchools,
        feedbacks,
        questions,
        schools: [],
        sessions,
        teachers,
        answers,
        total:
          coaches.length +
          feedbacks.length +
          questions.length +
          sessions.length +
          teachers.length,
      };
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

  static getAnswerToSync = async (sessions: Session[]) => {
    const repository = await dataSource.getRepository(Answer);
    return await repository.find({
      where: { session_id: In(sessions.map((item) => item.id)) },
    });
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

  static getCoachDataToSync = async (
    school: School
  ): Promise<{ coaches: Coach[]; coachSchools: CoachSchool[] }> => {
    const coachSchoolRepository = await dataSource.getRepository(CoachSchool);
    const coachSchools = await coachSchoolRepository.find({
      where: {
        school_id: school.id,
      },
    });

    return {
      coachSchools,
      coaches: coachSchools.map((item) => item.coach) as Coach[],
    };
  };

  static getFeedbackToSync = async (school: School, lastSync?: string) => {
    const repository = await dataSource.getRepository(Feedback);
    if (!lastSync) {
      return await repository.find(
        school ? { where: { answer: { school_id: school?.id } } } : undefined
      );
    } else {
      return await repository.find({
        where: {
          answer: { school_id: school?.id },
          created_at: MoreThan(new Date(lastSync)),
        },
      });
    }
  };
}
