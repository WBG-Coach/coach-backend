import { Request, Response } from "express";
import config from "../../../config";
import { constants } from "http2";
import jwt from "jsonwebtoken";
import UnauthorizedException from "../../helpers/errors/unauthorized-exception";
import { User } from "../../user/entity/user.entity";
import dataSource from "../../../database/config/ormconfig";
import { LogsService } from "../../logs/service";
import sgMail from "@sendgrid/mail";
import { OTP_EMAIL_NP, OTP_EMAIL_SL } from "./template-email";
import { Otp } from "../entity/otp.entity";
import { MoreThan } from "typeorm";
import { UserService } from "../../user/service";
import { LoginAttempt } from "../entity/login_attempt.entity";

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

    if (user.force_logout) {
      await UserService.updateAdmin(user.id, { ...user, force_logout: false });
      throw new UnauthorizedException("This user was updated");
    }

    const { ...userWithoutPassword } = user;

    return new User(userWithoutPassword);
  };

  public static signUser = (user: User, res: Response): void => {
    const payload = { email: user.email, sub: user.id };
    const newToken = jwt.sign(payload, secret, {
      expiresIn: 60480, // 1 Day
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

  public static sendEmailOTP = async (
    email: string,
    userName: string,
    size: number
  ) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

    const code = this.generateOTPCode(size);

    const msg = {
      to: email,
      from: "noreply@quanti.ca",
      subject: `${process.env.APP_NAME} - ${
        process.env.COUNTRY === "np" ? "एक-पटकको पासकोड" : "one-time passcode"
      }`,
      text: (process.env.COUNTRY === "np" ? OTP_EMAIL_NP : OTP_EMAIL_SL)
        .replace("#{code}", code)
        .replace("#{userName}", userName)
        .replace("#{appName}", process.env.APP_NAME || "Coach Digital")
        .replace("#{email}", email),
    };

    const otpRepository = await dataSource.getRepository(Otp);

    await sgMail.send(msg);

    return await otpRepository.save({
      email,
      code,
      created_at: new Date().getTime(),
    });
  };

  public static saveLoginAttempt = async (email: string) => {
    const otpRepository = await dataSource.getRepository(LoginAttempt);

    await otpRepository.save({ email, created_at: new Date().getTime() });
  };

  public static countLoginAttempt = async (email: string) => {
    const otpRepository = await dataSource.getRepository(LoginAttempt);
    const tenMinutesAgo = new Date().getTime() - 10 * 60 * 1000;

    return await otpRepository.countBy({
      email,
      created_at: MoreThan(tenMinutesAgo),
    });
  };

  public static verifyOTP = async (email: string, code: string) => {
    const otpRepository = await dataSource.getRepository(Otp);
    const tenMinutesAgo = new Date().getTime() - 10 * 60 * 1000;

    const otpCode = await otpRepository.findOneBy({
      email,
      code,
      used: false,
      created_at: MoreThan(tenMinutesAgo),
    });

    await this.saveLoginAttempt(email);

    if (otpCode?.id) {
      await otpRepository.update(otpCode?.id, { used: true });
    }

    return otpCode;
  };
}
