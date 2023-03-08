import { Request, Response } from "express";
import { constants } from "http2";
const { HTTP_STATUS_OK } = constants;
import Authentication from "../service";

export default class AuthenticationController {
  public static login = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await Authentication.authenticateUser(req);
      res.locals.authUser = user;
      Authentication.signUser(user, res);

      const { id, name, email } = user;

      const result = {
        id,
        name,
        email,
      };

      return res.status(HTTP_STATUS_OK).send(result);
    } catch (error) {
      Authentication.unauthorize(res, error);
    }
  };
}
