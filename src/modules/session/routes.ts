import { Application } from "express";
import Authentication from "../auth/service";
import SessionController from "./controller";

const sessionRouter = (app: Application): void => {
  app.post("/sl/api/session", Authentication.authenticate, SessionController.create);
  app.put("/sl/api/session", Authentication.authenticate, SessionController.update);
  app.delete(
    "/sl/api/session/:id",
    Authentication.authenticate,
    SessionController.delete
  );
  app.get(
    "/sl/api/session/:id",
    Authentication.authenticate,
    SessionController.findById
  );
  app.get("/sl/api/session", Authentication.authenticate, SessionController.findAll);
  app.get(
    "/sl/api/session-data",
    Authentication.authenticate,
    SessionController.getSessionData
  );
  app.get(
    "/sl/api/session-over-time",
    Authentication.authenticate,
    SessionController.getSessionOverTime
  );
};

export default sessionRouter;
