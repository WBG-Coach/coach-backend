import { Request, Response } from "express";
import { constants } from "http2";
import { RegionService } from "../service";

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = constants;

export default class SchoolController {
  public static create = async (req: Request, res: Response): Promise<any> => {
    try {
      const newItem = await RegionService.create(req.body);
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
      const deletedItem = await RegionService.delete(req.params.id);
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
      const updatedItem = await RegionService.update(req.params.id, req.body);
      return res.status(HTTP_STATUS_CREATED).send(updatedItem);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static findAllParents = async (
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

  public static findAllByParent = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const list = await RegionService.findByParentId(req.params.id);
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
