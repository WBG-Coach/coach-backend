import { Request, Response } from "express";
import { UserService } from "../service";
import { constants } from "http2";

const { HTTP_STATUS_OK, HTTP_STATUS_INTERNAL_SERVER_ERROR } = constants;

export default class UserController {
  public static findAllCoaches = async (
    _req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const list = await UserService.findAllCoaches();
      return res.status(HTTP_STATUS_OK).send(list);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static findAllAdmins = async (
    _req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const list = await UserService.findAllAdmins();
      return res.status(HTTP_STATUS_OK).send(list);

    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };
}
