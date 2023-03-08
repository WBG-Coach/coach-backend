import { Request, Response } from "express";
import { constants } from "http2";
import { GuideService } from "../service";

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = constants;

export default class GuideController {
  public static create = async (req: Request, res: Response): Promise<any> => {
    try {
      const newItem = await GuideService.create(req.body);
      return res.status(HTTP_STATUS_CREATED).send(newItem);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static update = async (req: Request, res: Response): Promise<any> => {
    try {
      const updatedItem = await GuideService.update(req.body.id, req.body);
      return res.status(HTTP_STATUS_CREATED).send(updatedItem);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static findAll = async (
    _req: Request,
    res: Response
  ): Promise<any> => {
    try {
      return res.status(HTTP_STATUS_OK).send({});
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static findById = async (
    _req: Request,
    res: Response
  ): Promise<any> => {
    try {
      return res.status(HTTP_STATUS_OK).send({});
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };
}
