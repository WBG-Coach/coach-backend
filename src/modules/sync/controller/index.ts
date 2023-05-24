import { Request, Response } from "express";
import { constants } from "http2";
import { WatermelonData } from "./types";
import { SyncService } from "../service";
import { Teacher } from "../../teacher/entity/teacher.entity";
import { Session } from "../../session/entity/session.entity";
import { School } from "../../school/entity/school.entity";
import { Image } from "../../image/entity";
import { Feedback } from "../../session/entity/feedback.entity";
import { Answer } from "../../answer/entity/answer.entity";
import { Question } from "../../question/entity/question.entity";
import { Competence } from "../../competencies/entity/competence.entity";
import { Coach } from "../../coach/entity/coach.entity";
const { HTTP_STATUS_OK, HTTP_STATUS_INTERNAL_SERVER_ERROR } = constants;

export default class SyncController {
  public static findAll = async (
    _req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const list = await SyncService.findAll();
      return res.status(HTTP_STATUS_OK).send(list);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static pull = async (req: Request, res: Response): Promise<any> => {
    try {
      const { last_pulled_at } = req.query;

      const dateToFilter = last_pulled_at
        ? new Date(Number(last_pulled_at))
        : undefined;

      const response = {
        changes: {
          teacher: await SyncService.getSyncByEntity(Teacher, dateToFilter),
          session: await SyncService.getSyncByEntity(Session, dateToFilter),
          image: await SyncService.getSyncByEntity(Image, dateToFilter),
          school: await SyncService.getSyncByEntity(School, dateToFilter),
          user: await SyncService.getSyncByEntity(Coach, dateToFilter),
          competence: await SyncService.getSyncByEntity(
            Competence,
            dateToFilter
          ),
          question: await SyncService.getSyncByEntity(Question, dateToFilter),
          answer: await SyncService.getSyncByEntity(Answer, dateToFilter),
          feedback: await SyncService.getSyncByEntity(Feedback, dateToFilter),
        },
        timestamp: Date.now(),
      };

      return res.status(HTTP_STATUS_OK).send(response);
    } catch (error) {
      console.log({ error });
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send(error);
    }
  };

  public static push = async (req: Request, res: Response): Promise<any> => {
    try {
      const body: WatermelonData = req.body;

      await SyncService.sync(body);

      return res.status(HTTP_STATUS_OK);
    } catch (error) {
      console.log({ error });
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    }
  };
}
