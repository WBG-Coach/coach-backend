import { Request, Response } from "express";
import { User } from "../../user/entity";
import config from "../../../config";
import { constants } from "http2";
import jwt from "jsonwebtoken";
import UnauthorizedException from "../../helpers/errors/unauthorized-exception";
import DBConnector from "../../../db-connector";
import InternalServerError from "../../helpers/errors/internal-server-error";

const { HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_UNAUTHORIZED } =
  constants;
const { secret } = config;

export default class Authentication {
  private static getBearerToken = (req: Request): string | undefined => {
    try {
      return req?.headers?.authorization?.split(" ")[1];
    } catch (error) {
      return undefined;
    }
  };

  private static verifyJWT = (token: string) => {
    return jwt.verify(token, secret);
  };

  public static unauthorize = (res: Response, error: any): void => {
    const status =
      error instanceof UnauthorizedException
        ? HTTP_STATUS_UNAUTHORIZED
        : HTTP_STATUS_INTERNAL_SERVER_ERROR;
    res.status(status).send({
      error: error.name,
      message: error.message,
    });
  };

  public static authenticateUser = async (req: Request): Promise<User> => {
    const { email, password }: { email: string; password: string } = req.body;
    if (!email) {
      return Promise.reject(new UnauthorizedException("Email not found."));
    }

    try {
      const userRepository = await DBConnector.getUserRepository();
      const user = await userRepository.findOne({
        where: { email },
      });

      if (!user)
        return Promise.reject(
          new UnauthorizedException("Email or password is invalid.")
        );

      return user
        .verifyIsSamePassword(password)
        .then(() => user)
        .catch(() => {
          return Promise.reject(
            new UnauthorizedException("Email ou Senha incorretos.")
          );
        });
    } catch (error) {
      return Promise.reject(new InternalServerError("Internal server error."));
    }
  };

  private static getAuthenticatedUser = async (id: number): Promise<User> => {
    const userRepository = await DBConnector.getUserRepository();
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      throw new UnauthorizedException("Invalid token");
    }

    return user;
  };

  public static signUser = (user: User, res: Response): void => {
    const payload = { email: user.email, sub: user.id };
    const newToken = jwt.sign(payload, secret, {
      expiresIn: 604800, // expires in 7 days
    });
    res.setHeader("token", newToken);
    res.setHeader("Access-Control-Allow-Headers", "true");
    res.setHeader("Access-Control-Expose-Headers", "token");
  };

  public static authenticate = (
    req: Request,
    res: Response,
    next: () => void
  ) => {
    const token = Authentication.getBearerToken(req);

    if (!token)
      return Authentication.unauthorize(
        res,
        new UnauthorizedException("Token didn't send.")
      );

    const id = Authentication.verifyJWT(token);

    if (!id)
      return Authentication.unauthorize(
        res,
        new UnauthorizedException("Invalid token.")
      );

    Authentication.getAuthenticatedUser(parseInt(id as string, 10))
      .then((user: User) => {
        res.locals.authUser = user;
        next();
      })
      .catch((error) => {
        return Authentication.unauthorize(res, error);
      });
  };
}
