import { Request, Response } from "express";
import { constants } from "http2";
import { LogsService } from "../service";
import { User } from "../../user/entity";
const { HTTP_STATUS_OK, HTTP_STATUS_INTERNAL_SERVER_ERROR } = constants;

export default class LogsController {
  public static findAll = async (
    _req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const currentUser: User = res.locals.authUser;

      if (currentUser.role !== "admin") {
        throw new Error("You can not do that.");
      }

      const list = await LogsService.findAll();
      return res.status(HTTP_STATUS_OK).send(list);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };
}
