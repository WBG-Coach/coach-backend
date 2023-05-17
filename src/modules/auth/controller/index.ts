import { Request, Response } from "express";
import { constants } from "http2";
const { HTTP_STATUS_OK } = constants;
import Authentication from "../service";
import axios from "axios";
import config from "../../../config";

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

  public static supertsetLogin = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const { access_token } = (
        await axios.post(config.supertset.host + "api/v1/security/login", {
          password: config.supertset.password,
          refresh: false,
          username: config.supertset.user,
          provider: "db",
        })
      ).data;

      const { token } = (
        await axios.post(
          config.supertset.host + "api/v1/security/guest_token",
          {
            user: {
              username: config.supertset.user,
              first_name: "Coach Digital",
              last_name: "SL",
            },
            resources: [
              {
                type: "dashboard",
                id: config.supertset.dashboard,
              },
            ],
            rls: [],
          },
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        )
      ).data;

      console.log({ token });
      return res.status(HTTP_STATUS_OK).send(token);
    } catch (error) {
      Authentication.unauthorize(res, error);
    }
  };
}
