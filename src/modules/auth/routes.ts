import { Application } from "express";
import Authentication from "./service";
import AuthenticationController from "./controller";

const AuthRouter = (app: Application): void => {
  app.post("/sl/api/auth", AuthenticationController.login);
  app.get("/sl/api/auth", Authentication.authenticate, (_req, res) =>
    res.status(200).send(res.locals?.authUser)
  );
  app.get(
    "/sl/api/auth/superset",
    Authentication.authenticate,
    AuthenticationController.supertsetLogin
  );
};

export default AuthRouter;
