import { Request, Response } from "express";
import { constants } from "http2";
import { CoachService } from "../service";
import Authentication from "../../auth/service";

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = constants;

export default class CoachController {
  public static signUp = async (req: Request, res: Response): Promise<any> => {
    try {
      const newCoach = await CoachService.create(req.body);
      await Authentication.sendEmailOTP(newCoach);

      return res.status(HTTP_STATUS_CREATED).send(newCoach);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static create = async (req: Request, res: Response): Promise<any> => {
    try {
      const newItem = await CoachService.create(req.body);
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
      const deletedItem = await CoachService.delete(req.params.id);
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
      const updatedItem = await CoachService.update(req.body.id, req.body);
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
      const list = await CoachService.findAll();
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
      const item = await CoachService.findByID(req.params.id);

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
}
