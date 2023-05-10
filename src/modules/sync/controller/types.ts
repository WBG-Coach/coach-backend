import { Competence } from "../../competencies/entity/competence.entity";
import { Question } from "../../question/entity/question.entity";
import { School } from "../../school/entity/school.entity";
import { Image } from "../../image/entity";
import { User } from "../../user/entity";
import { Answer } from "../../answer/entity/answer.entity";
import { Session } from "../../session/entity/session.entity";
import { Teacher } from "../../teacher/entity/teacher.entity";
import { Feedback } from "../../session/entity/feedback.entity";

export type DataSync<T> = {
  created: T[];
  updated: T[];
  deleted: T[];
};

export type DataModel = {
  school: DataSync<School>;
  user: DataSync<User>;
  teacher: DataSync<Teacher>;
  image: DataSync<Image>;
  feedback: DataSync<Feedback>;
  competence: DataSync<Competence>;
  question: DataSync<Question>;
  answer: DataSync<Answer>;
  session: DataSync<Session>;
};

export type WatermelonData = {
  model: string;
  deviceId: string;
  apiLevel: number;
  changes: DataModel;
  lastPulledAt: number;
};
