import dataSource from "../../../database/config/ormconfig";

export interface ITeachingPractices {
  name: string;
  data: {
    stars: {
      needsWork: number;
      keepWorking: number;
      needsAttention: number;
      almostThere: number;
      doingGreat: number;
    };
    teachers: number;
    teachersShowingImprovement: number;
    teacherWithoutFeedback: number;
  };
}

export interface IDashboard {
  teachingPractices: ITeachingPractices[];
  engagement: {
    teachersCoached: number;
    activeCoaches: number;
    coachingSessions: number;
    coachingSessionPerTeacher: number;
    coachingSessionPerTeacherGoal: number;
    teacherThatCompletedSecondSession: number;
  };
  targetedImprovementAreas: {};
}

export class DashboardService {
  static getData = async (): Promise<IDashboard> => {
    const engagementResult = await dataSource.query(`
      SELECT 
        COUNT(DISTINCT s.coach_id)::integer AS active_coaches ,
        COUNT(DISTINCT s.teacher_id)::integer as teachers_coached,
        COUNT(*)::integer as coaching_sessions,
        10 as coaching_session_per_teacher_goal,
        (
          SELECT AVG(num_sessions) 
          FROM (
            SELECT COUNT(s2.*) as num_sessions 
            FROM session as s2 
            GROUP BY s2.teacher_id
          ) as SessionCounts
        )::integer as coaching_session_per_teacher,
        (
          SELECT COUNT(*)
          FROM (
            SELECT s2.teacher_id, COUNT(*) as num_sessions
            FROM session s2
            GROUP BY s2.teacher_id
            HAVING COUNT(*) > 2
          ) AS SessionCounts
        )::integer AS teacher_that_completed_second_session
      FROM session as s
    `);

    const teachingPracticesResult = await dataSource.query(`
    SELECT c.title as name FROM competence AS c WHERE c.deleted_at IS null
    `);

    return {
      teachingPractices: teachingPracticesResult.map((item: any) => ({
        name: item.name,
        data: {
          stars: {
            needsWork: 20,
            keepWorking: 30,
            needsAttention: 45,
            almostThere: 25,
            doingGreat: 35,
          },
          teachers: 40,
          teachersShowingImprovement: 25,
          teacherWithoutFeedback: 35,
        },
      })),
      engagement: {
        activeCoaches: engagementResult[0].active_coaches,
        teachersCoached: engagementResult[0].teachers_coached,
        coachingSessions: engagementResult[0].coaching_sessions,
        coachingSessionPerTeacherGoal:
          engagementResult[0].coaching_session_per_teacher_goal,
        coachingSessionPerTeacher:
          engagementResult[0].coaching_session_per_teacher,
        teacherThatCompletedSecondSession:
          engagementResult[0].teacher_that_completed_second_session,
      },
      targetedImprovementAreas: {},
    };
  };

  static insertMock = async (): Promise<any> => {
    const engagementResult = await dataSource.query(`
      SELECT 
        COUNT(DISTINCT s.coach_id)::integer AS active_coaches ,
        COUNT(DISTINCT s.teacher_id)::integer as teachers_coached,
        COUNT(*)::integer as coaching_sessions,
        10 as coaching_session_per_teacher_goal,
        (
          SELECT AVG(num_sessions) 
          FROM (
            SELECT COUNT(s2.*) as num_sessions 
            FROM session as s2 
            GROUP BY s2.teacher_id
          ) as SessionCounts
        )::integer as coaching_session_per_teacher,
        (
          SELECT COUNT(*)
          FROM (
            SELECT s2.teacher_id, COUNT(*) as num_sessions
            FROM session s2
            GROUP BY s2.teacher_id
            HAVING COUNT(*) > 2
          ) AS SessionCounts
        )::integer AS teacher_that_completed_second_session
      FROM session as s
    `);
    return {};
  };
}
