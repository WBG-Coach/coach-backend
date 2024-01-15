import { Request, Response } from "express";
import config from "../../../config";
import { constants } from "http2";
import jwt from "jsonwebtoken";
import UnauthorizedException from "../../helpers/errors/unauthorized-exception";
import InternalServerError from "../../helpers/errors/internal-server-error";
import { User } from "../../user/entity/user.entity";
import dataSource from "../../../database/config/ormconfig";
import { LogsService } from "../../logs/service";
import { Coach } from "../../coach/entity/coach.entity";
import sgMail from "@sendgrid/mail";
import { OTP_EMAIL } from "./template-email";
import { Otp } from "../entity/otp.entity";
import { LessThan, MoreThan } from "typeorm";

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

  private static verifyJWT = (token: string): { email: string } => {
    return jwt.verify(token, secret) as { email: string };
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

  private static getAuthenticatedUser = async (
    email: string
  ): Promise<User> => {
    const userRepository = await dataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException("Invalid token");
    }

    const { ...userWithoutPassword } = user;

    return new User(userWithoutPassword);
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

  public static authenticate = async (
    req: Request,
    res: Response,
    next: () => void
  ) => {
    try {
      const token = Authentication.getBearerToken(req);

      if (!token)
        return Authentication.unauthorize(
          res,
          new UnauthorizedException("Token didn't send.")
        );

      const { email } = Authentication.verifyJWT(token);

      const user = await Authentication.getAuthenticatedUser(email);
      await LogsService.create(user, req.path);
      res.locals.authUser = user;
      next();
    } catch (error) {
      return Authentication.unauthorize(
        res,
        new UnauthorizedException("Invalid token.")
      );
    }
  };

  public static generateOTPCode = (size: number) => {
    let code = "";
    for (let i = 0; i < size; i++) {
      code += Math.floor(Math.random() * 10).toString();
    }
    return code;
  };

  public static sendEmailOTP = async (email: string, size = 6) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

    const code = this.generateOTPCode(size);

    const msg = {
      to: email,
      from: "noreply@quanti.ca",
      subject: "Coach Digital - OTP",
      html: OTP_EMAIL.replace("#{code}", code),
      text: `Code: code`,
    };

    const otpRepository = await dataSource.getRepository(Otp);

    await sgMail.send(msg);

    return await otpRepository.save({
      email,
      code,
      created_at: new Date().getTime(),
    });
  };

  public static verifyOTP = async (email: string, code: string) => {
    const otpRepository = await dataSource.getRepository(Otp);
    const tenMinutesAgo = new Date().getTime() - 10 * 60 * 1000;

    return await otpRepository.findOneBy({
      email,
      code,
      created_at: MoreThan(tenMinutesAgo),
    });
  };
}
