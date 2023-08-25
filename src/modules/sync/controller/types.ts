import { Competence } from "../../competencies/entity/competence.entity";
import { Question } from "../../question/entity/question.entity";
import { School } from "../../school/entity/school.entity";
import { Image } from "../../image/entity";
import { User } from "../../user/entity";
import { Answer } from "../../answer/entity/answer.entity";
import { Session } from "../../session/entity/session.entity";
import { Teacher } from "../../teacher/entity/teacher.entity";
import { Feedback } from "../../session/entity/feedback.entity";
import { Coach } from "../../coach/entity/coach.entity";

export type DataChanges = {
  images?: Image[];
  coaches?: Coach[];
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
  sessions: Session[];
  questions: Question[];
  schools: School[];
  teachers: Teacher[];
  feedbacks: Feedback[];
  answers: Answer[];
  total: number;
};
