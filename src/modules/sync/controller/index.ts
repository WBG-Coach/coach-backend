import { Request, Response } from "express";
import { constants } from "http2";
import { WatermelonData } from "./types";
import { SyncService } from "../service";
import { Teacher } from "../../teacher/entity/teacher.entity";
import { Session } from "../../session/entity/session.entity";
import { School } from "../../school/entity/school.entity";
import { Image } from "../../image/entity";
const { HTTP_STATUS_OK, HTTP_STATUS_INTERNAL_SERVER_ERROR } = constants;

export default class SyncController {
  public static pull = async (req: Request, res: Response): Promise<any> => {
    try {
      const { last_pulled_at } = req.query;

      const dateToFilter = last_pulled_at
        ? new Date(Number(last_pulled_at))
        : undefined;

      return res.status(HTTP_STATUS_OK).send({
        changes: {
          teacher: await SyncService.getSyncByEntity(Teacher, dateToFilter),
          session: await SyncService.getSyncByEntity(Session, dateToFilter),
          image: await SyncService.getSyncByEntity(Image, dateToFilter),
          school: await SyncService.getSyncByEntity(School, dateToFilter),
          user: { created: [], deleted: [], updated: [] },
          competence: { created: [], deleted: [], updated: [] },
          question: { created: [], deleted: [], updated: [] },
          answer: { created: [], deleted: [], updated: [] },
          feedback: { created: [], deleted: [], updated: [] },
        },
        timestamp: Date.now(),
      });
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
