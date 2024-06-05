import { Request, Response } from "express";
import { constants } from "http2";
import { RegionService } from "../service";
import { User } from "../../user/entity";

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = constants;

export default class SchoolController {
  public static save = async (req: Request, res: Response): Promise<any> => {
    try {
      const newItem = await RegionService.createAndUpdate(req.body);
      return res.status(HTTP_STATUS_CREATED).send(newItem);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static createBatch = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const response = await RegionService.createInBatch(req.body.batch);
      return res.status(HTTP_STATUS_CREATED).send(response);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static delete = async (req: Request, res: Response): Promise<any> => {
    try {
      const currentUser: User = res.locals.authUser;

      if (currentUser.role !== "admin") {
        throw new Error("You can not do that.");
      }

      const deletedItem = await RegionService.delete(req.params.id);
      return res.status(HTTP_STATUS_CREATED).send(deletedItem);
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
      const list = await RegionService.findAll();
      return res.status(HTTP_STATUS_OK).send(list);
    } catch (error) {
      console.log({ error });
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };
  public static findAllTree = async (
    _req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const list = await RegionService.findAllTrees();
      return res.status(HTTP_STATUS_OK).send(list);
    } catch (error) {
      console.log({ error });
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
      const item = await RegionService.findById(req.params.id);
      return res.status(HTTP_STATUS_OK).send(item);
    } catch (error) {
      console.log({ error });
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };
}
