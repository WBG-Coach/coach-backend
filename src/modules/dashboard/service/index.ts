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
        5 as coaching_session_per_teacher_goal,
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
     SELECT c.title as name 
          ,	(SELECT COUNT(*) FROM question AS q INNER JOIN answer AS a ON a.question_id = q.id WHERE q.competence_id = c.id AND a.value = 1)::integer as needs_work
          ,	(SELECT COUNT(*) FROM question AS q INNER JOIN answer AS a ON a.question_id = q.id WHERE q.competence_id = c.id AND a.value = 2)::integer as keep_working
          ,	(SELECT COUNT(*) FROM question AS q INNER JOIN answer AS a ON a.question_id = q.id WHERE q.competence_id = c.id AND a.value = 3)::integer as needs_attention
          ,	(SELECT COUNT(*) FROM question AS q INNER JOIN answer AS a ON a.question_id = q.id WHERE q.competence_id = c.id AND a.value = 4)::integer as almost_there
          ,	(SELECT COUNT(*) FROM question AS q INNER JOIN answer AS a ON a.question_id = q.id WHERE q.competence_id = c.id AND a.value = 5)::integer as doing_great
          ,	(SELECT COUNT(s.teacher_id) FROM feedback AS f INNER JOIN session AS s ON s.id = f.session_id WHERE f.competence_id = c.id )::integer as teachers
          ,	(SELECT COUNT(*) FROM session AS s LEFT JOIN feedback AS f ON s.id = f.session_id WHERE f.session_id IS NULL)::integer as without_feedback
       FROM	competence AS c 
      WHERE	c.deleted_at IS null
    `);

    return {
      teachingPractices: teachingPracticesResult.map((item: any) => ({
        name: item.name,
        data: {
          stars: {
            needsWork: item.needs_work,
            keepWorking: item.keep_working,
            needsAttention: item.needs_attention,
            almostThere: item.almost_there,
            doingGreat: item.doing_great,
          },
          teachers: item.teachers,
          teachersShowingImprovement: 0,
          teacherWithoutFeedback: item.without_feedback,
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

  static getDataBySchoolId = async (schoolId: string): Promise<IDashboard> => {
    const engagementResult = await dataSource.query(
      `
      SELECT
        COUNT(DISTINCT s.coach_id)::integer AS active_coaches ,
        COUNT(DISTINCT s.teacher_id)::integer as teachers_coached,
        COUNT(*)::integer as coaching_sessions,
        5 as coaching_session_per_teacher_goal,
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
      WHERE s.school_id = '${schoolId}'
    `
    );

    const teachingPracticesResult = await dataSource.query(`
     SELECT c.title as name 
          ,	(SELECT COUNT(*) FROM question AS q INNER JOIN answer AS a ON a.question_id = q.id WHERE q.competence_id = c.id AND a.value = 1)::integer as needs_work
          ,	(SELECT COUNT(*) FROM question AS q INNER JOIN answer AS a ON a.question_id = q.id WHERE q.competence_id = c.id AND a.value = 2)::integer as keep_working
          ,	(SELECT COUNT(*) FROM question AS q INNER JOIN answer AS a ON a.question_id = q.id WHERE q.competence_id = c.id AND a.value = 3)::integer as needs_attention
          ,	(SELECT COUNT(*) FROM question AS q INNER JOIN answer AS a ON a.question_id = q.id WHERE q.competence_id = c.id AND a.value = 4)::integer as almost_there
          ,	(SELECT COUNT(*) FROM question AS q INNER JOIN answer AS a ON a.question_id = q.id WHERE q.competence_id = c.id AND a.value = 5)::integer as doing_great
          ,	(SELECT COUNT(s.teacher_id) FROM feedback AS f INNER JOIN session AS s ON s.id = f.session_id WHERE f.competence_id = c.id )::integer as teachers
          ,	(SELECT COUNT(*) FROM session AS s LEFT JOIN feedback AS f ON s.id = f.session_id WHERE f.session_id IS NULL)::integer as without_feedback
       FROM	competence AS c 
      WHERE	c.deleted_at IS null
    `);

    return {
      teachingPractices: teachingPracticesResult.map((item: any) => ({
        name: item.name,
        data: {
          stars: {
            needsWork: item.needs_work,
            keepWorking: item.keep_working,
            needsAttention: item.needs_attention,
            almostThere: item.almost_there,
            doingGreat: item.doing_great,
          },
          teachers: item.teachers,
          teachersShowingImprovement: 0,
          teacherWithoutFeedback: item.without_feedback,
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

  static getDataRegionRegion = async (region: string): Promise<IDashboard> => {
    const engagementResult = await dataSource.query(
      `
      SELECT
        COUNT(DISTINCT s.coach_id)::integer AS active_coaches ,
        COUNT(DISTINCT s.teacher_id)::integer as teachers_coached,
        COUNT(*)::integer as coaching_sessions,
        5 as coaching_session_per_teacher_goal,
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
      INNER JOIN school as school ON school.id = s.school_id
      WHERE school.region = '${region}'
    `
    );

    const teachingPracticesResult = await dataSource.query(`
     SELECT c.title as name 
          ,	(SELECT COUNT(*) FROM question AS q INNER JOIN answer AS a ON a.question_id = q.id WHERE q.competence_id = c.id AND a.value = 1)::integer as needs_work
          ,	(SELECT COUNT(*) FROM question AS q INNER JOIN answer AS a ON a.question_id = q.id WHERE q.competence_id = c.id AND a.value = 2)::integer as keep_working
          ,	(SELECT COUNT(*) FROM question AS q INNER JOIN answer AS a ON a.question_id = q.id WHERE q.competence_id = c.id AND a.value = 3)::integer as needs_attention
          ,	(SELECT COUNT(*) FROM question AS q INNER JOIN answer AS a ON a.question_id = q.id WHERE q.competence_id = c.id AND a.value = 4)::integer as almost_there
          ,	(SELECT COUNT(*) FROM question AS q INNER JOIN answer AS a ON a.question_id = q.id WHERE q.competence_id = c.id AND a.value = 5)::integer as doing_great
          ,	(SELECT COUNT(s.teacher_id) FROM feedback AS f INNER JOIN session AS s ON s.id = f.session_id WHERE f.competence_id = c.id )::integer as teachers
          ,	(SELECT COUNT(*) FROM session AS s LEFT JOIN feedback AS f ON s.id = f.session_id WHERE f.session_id IS NULL)::integer as without_feedback
       FROM	competence AS c 
      WHERE	c.deleted_at IS null
    `);

    return {
      teachingPractices: teachingPracticesResult.map((item: any) => ({
        name: item.name,
        data: {
          stars: {
            needsWork: item.needs_work,
            keepWorking: item.keep_working,
            needsAttention: item.needs_attention,
            almostThere: item.almost_there,
            doingGreat: item.doing_great,
          },
          teachers: item.teachers,
          teachersShowingImprovement: 0,
          teacherWithoutFeedback: item.without_feedback,
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
