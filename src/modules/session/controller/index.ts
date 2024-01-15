import { Request, Response } from "express";
import { constants } from "http2";
import { SessionService } from "../service";
import { RegionService } from "../../region/service";

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = constants;

export default class SessionController {
  public static create = async (req: Request, res: Response): Promise<any> => {
    try {
      const newItem = await SessionService.create(req.body);
      return res.status(HTTP_STATUS_CREATED).send(newItem);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static delete = async (req: Request, res: Response): Promise<any> => {
    try {
      const deletedItem = await SessionService.delete(req.params.id);
      return res.status(HTTP_STATUS_CREATED).send(deletedItem);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static update = async (req: Request, res: Response): Promise<any> => {
    try {
      const updatedItem = await SessionService.update(req.body.id, req.body);
      return res.status(HTTP_STATUS_CREATED).send(updatedItem);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      let list = [];
      if (res.locals?.authUser?.region_id) {
        const regions = await RegionService.getChildren(
          res.locals?.authUser.region_id
        );

        list = await SessionService.findAll(
          regions.map((item) => `${item.id}`)
        );
      } else {
        list = await SessionService.findAll();
      }

      return res.status(HTTP_STATUS_OK).send(list);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static findById = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const item = await SessionService.findByID(req.params.id);

      if (!item) {
        res.status(HTTP_STATUS_NOT_FOUND).send({
          error: HTTP_STATUS_NOT_FOUND,
          message: "Object not found",
        });
      }

      return res.status(HTTP_STATUS_OK).send(item);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static getSessionData = async (
    req: Request<
      any,
      any,
      any,
      {
        period?: string;
        region?: string;
        schoolId?: string;
        showOnlyWithValues?: string;
      }
    >,
    res: Response
  ) => {
    try {
      const { period, region, schoolId, showOnlyWithValues } = req.query;
      let list = [];

      if (region) {
        const regions = await RegionService.getChildren(region);

        list = await SessionService.getSessionData(
          period,
          regions.map((item) => `'${item.id}'`).join(),
          schoolId,
          showOnlyWithValues
        );
      } else {
        list = await SessionService.getSessionData(
          period,
          region,
          schoolId,
          showOnlyWithValues
        );
      }

      return res.status(HTTP_STATUS_OK).send(list);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static getSessionOverTime = async (
    req: Request<
      any,
      any,
      any,
      { region?: string; schoolId?: string; showOnlyWithValues?: string }
    >,
    res: Response
  ) => {
    try {
      const { region, schoolId, showOnlyWithValues } = req.query;
      let list = [];

      if (region) {
        const regions = await RegionService.getChildren(region);

        list = await SessionService.getSessionOverTime(
          regions.map((item) => `'${item.id}'`).join(),
          schoolId,
          showOnlyWithValues
        );
      } else {
        list = await SessionService.getSessionOverTime(
          region,
          schoolId,
          showOnlyWithValues
        );
      }
      return res.status(HTTP_STATUS_OK).send(list);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };
}
