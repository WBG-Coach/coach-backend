import { Request, Response } from "express";
import { constants } from "http2";
import { DataToSync } from "./types";
import { SyncService } from "../service";
import { SchoolService } from "../../school/service";
import { School } from "../../school/entity/school.entity";
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

  public static push = async (req: Request, res: Response): Promise<any> => {
    try {
      const body: DataToSync = req.body;
      const token: any = req.headers.token;
      let school: School | null = null;

      if (token) {
        const id = SchoolService.decryptId(token);
        school = await SchoolService.findByID(id);
      }

      const response = await SyncService.sync(body, school);

      return res.status(HTTP_STATUS_OK).send(response);
    } catch (error) {
      console.log({ error });
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    }
  };
}
