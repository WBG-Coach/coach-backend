import { Request, Response } from "express";
import { constants } from "http2";
import { DataToSync } from "./types";
import { SyncService } from "../service";
import { SchoolService } from "../../school/service";

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_UNAUTHORIZED,
} = constants;

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
      const token: any = req.headers.token;

      if (!token) {
        return res.status(HTTP_STATUS_UNAUTHORIZED).send();
      }

      const body: DataToSync = req.body;
      const id = SchoolService.decryptId(token);
      const school = await SchoolService.findByID(id);
      const response = await SyncService.sync(body, school);

      return res.status(HTTP_STATUS_OK).send(response);
    } catch (error) {
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    }
  };
}
