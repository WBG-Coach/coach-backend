import { Request, Response } from "express";
import { constants } from "http2";
import { WatermelonData } from "./types";
import { SyncService } from "../service";
const { HTTP_STATUS_OK, HTTP_STATUS_INTERNAL_SERVER_ERROR } = constants;

export default class SyncController {
  public static pull = async (req: Request, res: Response): Promise<any> => {
    try {
      console.log("query => ", req.query);

      return res.status(HTTP_STATUS_OK).send({
        changes: {
          school: { created: [], deleted: [], updated: [] },
          user: { created: [], deleted: [], updated: [] },
          image: { created: [], deleted: [], updated: [] },
          guide: { created: [], deleted: [], updated: [] },
          competence: { created: [], deleted: [], updated: [] },
          question: { created: [], deleted: [], updated: [] },
          answer: { created: [], deleted: [], updated: [] },
          feedback: { created: [], deleted: [], updated: [] },
          session: { created: [], deleted: [], updated: [] },
        },
        timestamp: Date.now(),
      });
    } catch (error) {
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    }
  };

  public static push = async (req: Request, res: Response): Promise<any> => {
    try {
      const body: WatermelonData = req.body;

      await SyncService.sync(body);

      return res.status(HTTP_STATUS_OK);
    } catch (error) {
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    }
  };
}
