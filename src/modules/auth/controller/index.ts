import { Request, Response } from "express";
import { constants } from "http2";
const { HTTP_STATUS_OK } = constants;
import Authentication from "../service";
import axios from "axios";
import config from "../../../config";
import { CoachService } from "../../coach/service";
import { UserService } from "../../user/service";
import { LogsService } from "../../logs/service";
import { SchoolService } from "../../school/service";
import { CompetenceService } from "../../competencies/service";
import { QuestionService } from "../../question/service";

export default class AuthenticationController {
  public static supertsetLogin = async (
    _req: Request,
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

      return res.status(HTTP_STATUS_OK).send(token);
    } catch (error) {
      Authentication.unauthorize(res, error);
    }
  };

  public static otpAdmin = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (email) {
      const user = await UserService.findUserByEmail(email);

      if (!user?.email) {
        return res.status(404).send({ user });
      }

      await Authentication.sendEmailOTP(user.email, user?.name || "", 8);

      return res.status(200).send(email);
    }

    return res.status(404).send({ email });
  };

  public static verifyOtpAdmin = async (req: Request, res: Response) => {
    const { email, code } = req.body;

    if (email && code) {
      const user = await UserService.findUserByEmail(email);

      if (!user?.email) {
        return res.status(404).send({ user });
      }
      const loginAttempts = await Authentication.countLoginAttempt(user.email);

      if (loginAttempts >= 10) {
        return res
          .status(400)
          .send({ error: "Number of attempts exceeded, try again later" });
      }

      const otp = await Authentication.verifyOTP(user.email, code);

      const { id, name, role, region } = user;

      if (otp) {
        await LogsService.create(user, "login");
        res.locals.authUser = user;
        Authentication.signUser(user, res);

        return res.status(200).send({
          id,
          name,
          role,
          email,
          region,
        });
      }

      return res.status(404).send({ otp });
    }

    return res.status(404).send({ email, code });
  };

  public static otp = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (email) {
      const coach = await CoachService.findByEmail(email);

      if (!coach?.email) {
        return res.status(404).send({ coach });
      }

      await Authentication.sendEmailOTP(coach.email, coach?.name || "", 6);

      return res.status(200).send(email);
    }

    return res.status(404).send({ email });
  };

  public static verifyOtp = async (req: Request, res: Response) => {
    const { email, code } = req.body;

    if (email && code) {
      const coach = await CoachService.findByEmail(email);

      if (!coach?.email) {
        return res.status(404).send({ coach });
      }
      const loginAttempts = await Authentication.countLoginAttempt(coach.email);

      if (loginAttempts >= 10) {
        return res
          .status(400)
          .send({ error: "Number of attempts exceeded, try again later" });
      }

      const otp = await Authentication.verifyOTP(coach.email, code);

      if (otp) {
        const competencies = await CompetenceService.findAll();
        const questions = await QuestionService.findAll();

        return res.status(200).send({
          competencies,
          questions,
          coach: {
            ...coach,
            coachSchools: coach.coachSchools?.map((coachSchool) => ({
              ...coachSchool,
              school: {
                ...coachSchool.school,
                key: SchoolService.encryptId(coachSchool?.school?.id || ""),
              },
            })),
          },
        });
      }

      return res.status(404).send({ otp });
    }

    return res.status(404).send({ email, code });
  };
}
