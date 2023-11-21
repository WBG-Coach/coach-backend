import { Application } from "express";
import Authentication from "../auth/service";
import SessionController from "./controller";
import config from "../../config";

const sessionRouter = (app: Application): void => {
  app.post(
    `/${config.country}/api/session`,
    Authentication.authenticate,
    SessionController.create
  );
  app.put(
    `/${config.country}/api/session`,
    Authentication.authenticate,
    SessionController.update
  );
  app.delete(
    `/${config.country}/api/session/:id`,
    Authentication.authenticate,
    SessionController.delete
  );
  app.get(
    `/${config.country}/api/session/:id`,
    Authentication.authenticate,
    SessionController.findById
  );
  app.get(
    `/${config.country}/api/session`,
    Authentication.authenticate,
    SessionController.findAll
  );
  app.get(
    `/${config.country}/api/session-data`,
    Authentication.authenticate,
    SessionController.getSessionData
  );
  app.get(
    `/${config.country}/api/session-over-time`,
    Authentication.authenticate,
    SessionController.getSessionOverTime
  );
};

export default sessionRouter;
