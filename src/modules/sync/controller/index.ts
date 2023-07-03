import { Request, Response } from "express";
import { constants } from "http2";
import { DataToSync } from "./types";
import { SyncService } from "../service";
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

      await SyncService.sync(body);

      return res.status(HTTP_STATUS_OK).send();
    } catch (error) {
      console.log({ error });
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send();
    }
  };
}
