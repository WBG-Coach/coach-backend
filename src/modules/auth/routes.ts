import { Application } from "express";
import Authentication from "./service";
import AuthenticationController from "./controller";

const AuthRouter = (app: Application): void => {
  app.post("/auth", AuthenticationController.login);
  app.get("/auth", Authentication.authenticate, (_req, res) =>
    res.status(200).send(res.locals?.authUser)
  );
  app.get(
    "/auth/superset",
    Authentication.authenticate,
    AuthenticationController.supertsetLogin
  );
};

export default AuthRouter;
