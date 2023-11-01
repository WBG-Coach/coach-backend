import { DeleteResult, UpdateResult } from "typeorm";
import dataSource from "../../../database/config/ormconfig";
import { Session } from "../entity/session.entity";

export class SessionService {
  static create = async (data: Session): Promise<Session> => {
    const sessionRepository = await dataSource.getRepository(Session);

    return sessionRepository.save(data);
  };

  static update = async (id: string, data: Session): Promise<UpdateResult> => {
    const sessionRepository = await dataSource.getRepository(Session);

    return sessionRepository.update(id, data);
  };

  static delete = async (id: string): Promise<DeleteResult> => {
    const sessionRepository = await dataSource.getRepository(Session);

    return sessionRepository.delete(id);
  };

  static findByID = async (id: string): Promise<Session | null> => {
    const sessionRepository = await dataSource.getRepository(Session);

    return sessionRepository.findOne({ where: { id } });
  };

  static findAll = async (): Promise<Session[]> => {
    const sessionRepository = await dataSource.getRepository(Session);

    return sessionRepository.find();
  };

  static getSessionData = async (
    period?: string,
    region?: string,
    schoolId?: string
  ): Promise<any[]> => {
    const sessionRepository = await dataSource.getRepository(Session);

    const result = await sessionRepository.query(`
        SELECT 
            s.id AS "id",
            s.name AS "School Name",
            COUNT(DISTINCT cs.coach_id) AS "Number of Coaches",
            COUNT(DISTINCT ses.teacher_id) FILTER (WHERE ses.id IS NOT NULL) AS "Teachers with at least 1 Session",
            COUNT(DISTINCT f.id) AS "Number of Feedbacks",
            AVG(a.value) FILTER (WHERE c.title = 'Supportive learning environment') AS "Supportive learning environment",
            AVG(a.value) FILTER (WHERE c.title = 'Critical thinking') AS "Average Value for Critical Thinking",
            AVG(a.value) FILTER (WHERE c.title = 'Effective teaching') AS "Effective teaching",
            AVG(a.value) FILTER (WHERE c.title = 'Time on learning') AS "Time on learning",
            AVG(a.value) FILTER (WHERE c.title = 'Positive behavioral expectations') AS "Positive behavioral expectations"
            
        FROM 
            public.school s
            
            -- Count Coaches
            LEFT JOIN public.coach_school cs ON s.id = cs.school_id
            
            -- Count Teachers with at least 1 Session
            LEFT JOIN public.teacher t ON s.id = t.school_id
            LEFT JOIN public.session ses ON t.id = ses.teacher_id
            
            -- Count and Average Feedbacks
            LEFT JOIN public.answer a ON ses.id = a.session_id
            LEFT JOIN public.feedback f ON a.id = f.answer_id
            LEFT JOIN public.question q ON a.question_id = q.id
            LEFT JOIN public.competence c ON q.competence_id = c.id
          
        WHERE
          cs.coach_id IS NOT null
          ${period ? `AND ses.created_at >= NOW() - INTERVAL '${period}'` : ""}
          ${region ? `AND s.region = '${region}'` : ""}
          ${schoolId ? `AND s.id = '${schoolId}'` : ""}
        GROUP BY 
            s.id;
    `);

    return result;
  };

  static getSessionOverTime = async (
    region?: string,
    schoolId?: string
  ): Promise<any[]> => {
    const sessionRepository = await dataSource.getRepository(Session);

    const result = await sessionRepository.query(`
      SELECT 
          s.id AS "id",
          s.name AS "School Name",
          COUNT(DISTINCT cs.coach_id) AS "Number of Coaches",
          COUNT(DISTINCT ses.teacher_id) FILTER (WHERE ses.id IS NOT NULL) AS "Teachers with at least 1 Session",
          COUNT(DISTINCT f.id) AS "Number of Feedbacks",
          
          COUNT(DISTINCT ses.teacher_id) FILTER (WHERE ses.created_at >= NOW() - INTERVAL '30 days') AS "Last 30 days",
          COUNT(DISTINCT ses.teacher_id) FILTER (WHERE ses.created_at BETWEEN (NOW() - INTERVAL '60 days') AND (NOW() - INTERVAL '30 days')) AS "Last 30 and 60 days",
          COUNT(DISTINCT ses.teacher_id) FILTER (WHERE ses.created_at BETWEEN (NOW() - INTERVAL '90 days') AND (NOW() - INTERVAL '60 days')) AS "Last 60 and 90 days",
          COUNT(DISTINCT ses.teacher_id) FILTER (WHERE ses.created_at <= NOW() - INTERVAL '90 days') AS "More than 90 days ago"
          
      FROM 
          public.school s

          LEFT JOIN public.coach_school cs ON s.id = cs.school_id

          LEFT JOIN public.teacher t ON s.id = t.school_id
          LEFT JOIN public.session ses ON t.id = ses.teacher_id
          
          LEFT JOIN public.answer a ON ses.id = a.session_id
          LEFT JOIN public.feedback f ON a.id = f.answer_id

        WHERE
          cs.coach_id IS NOT null
          ${region ? `AND s.region = '${region}'` : ""}
          ${schoolId ? `AND s.id = '${schoolId}'` : ""}

        GROUP BY 
            s.id;
    `);

    return result;
  };
}
