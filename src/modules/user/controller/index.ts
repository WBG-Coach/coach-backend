import { Request, Response } from "express";
import { UserService } from "../service";
import { constants } from "http2";
import { User } from "../entity";

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_CREATED,
} = constants;

export default class UserController {
  public static findAllCoaches = async (
    _req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const list = await UserService.findAllUsers();
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
      const currentUser: User = res.locals.authUser;

      if (currentUser.role !== "admin") {
        throw new Error("You can not do that.");
      }

      const list = await UserService.findAllAdmins();
      return res.status(HTTP_STATUS_OK).send(list);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static updateAdmin = async (
    _req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { user_id } = _req.params;
      const newUser = _req.body;
      if (!user_id) {
        throw new Error("Identifier of user not found.");
      }

      const currentUser: User = res.locals.authUser;

      if (user_id !== currentUser.id && currentUser.role !== "admin") {
        throw new Error("You can not do that.");
      }

      if (newUser.role && currentUser.role !== "admin") {
        throw new Error("You can not do that.");
      }

      await UserService.updateAdmin(user_id, newUser);

      return res.status(HTTP_STATUS_OK).send({});
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static signUpAdmin = async (
    _req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const currentUser: User = res.locals.authUser;

      if (currentUser.role !== "admin") {
        throw new Error("You can not do that.");
      }

      const newUser = _req.body;

      return res
        .status(HTTP_STATUS_CREATED)
        .send(UserService.signUpAdmin(newUser));
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static removeAdmin = async (
    _req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { user_id } = _req.params;
      if (!user_id) {
        throw new Error("Identifier of user not found.");
      }

      await UserService.removeAdmin(user_id);
      return res.status(HTTP_STATUS_OK).send({});
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };
}
