import { Application } from "express";
import Authentication from "./service";
import AuthenticationController from "./controller";
import config from "../../config";

const AuthRouter = (app: Application): void => {
  app.post(`/${config.country}/api/auth`, AuthenticationController.login);
  app.get(
    `/${config.country}/api/auth`,
    Authentication.authenticate,
    (_req, res) => res.status(200).send(res.locals?.authUser)
  );
  app.get(
    `/${config.country}/api/auth/superset`,
    Authentication.authenticate,
    AuthenticationController.supertsetLogin
  );
  app.post(`/${config.country}/api/auth/otp`, AuthenticationController.otp);

  app.post(
    `/${config.country}/api/auth/otp/verify`,
    AuthenticationController.verifyOtp
  );
};

export default AuthRouter;
