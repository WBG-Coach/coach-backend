import { Request, Response } from "express";
import { DashboardService } from "../service";

import { constants } from "http2";

const { HTTP_STATUS_OK, HTTP_STATUS_INTERNAL_SERVER_ERROR } = constants;

export default class DashboardController {
  public static getData = async (
    req: Request<unknown, unknown, unknown, { region?: string }>,
    res: Response
  ): Promise<any> => {
    try {
      const { region } = req.query;

      if (region) {
        const data = await DashboardService.getDataPerRegion(region);
        return res.status(HTTP_STATUS_OK).send(data);
      }

      const data = await DashboardService.getData();
      return res.status(HTTP_STATUS_OK).send(data);
    } catch (error) {
      console.log({ error });
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static insertMock = async (
    _req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const data = await DashboardService.getData();
      return res.status(HTTP_STATUS_OK).send(data);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };
}
