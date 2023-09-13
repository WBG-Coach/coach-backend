import { Competence } from "../../competencies/entity/competence.entity";
import { Question } from "../../question/entity/question.entity";
import { School } from "../../school/entity/school.entity";
import { Image } from "../../image/entity";
import { Answer } from "../../answer/entity/answer.entity";
import { Session } from "../../session/entity/session.entity";
import { Teacher } from "../../teacher/entity/teacher.entity";
import { Feedback } from "../../session/entity/feedback.entity";
import { Coach } from "../../coach/entity/coach.entity";
import { CoachSchool } from "../../coach/entity/coach-school.entity";

export type DataChanges = {
  images?: Image[];
  coaches?: Coach[];
  coachSchools?: CoachSchool[];
  teachers?: Teacher[];
  sessions?: Session[];
  answers?: Answer[];
  feedbacks?: Feedback[];
};

export type DataToSync = {
  model: string;
  lastSync?: string;
  deviceId: string;
  apiLevel: number;
  changes: DataChanges;
  lastPulledAt: number;
};

export type SyncData = {
  coaches: Coach[];
  coachSchools: CoachSchool[];
  sessions: Session[];
  questions: Question[];
  schools: School[];
  teachers: Teacher[];
  feedbacks: Feedback[];
  answers: Answer[];
  total: number;
};
