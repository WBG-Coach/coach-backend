import { Application } from "express";
import Authentication from "../auth/service";
import CoachController from "./controller";
import config from "../../config";

const coachRouter = (app: Application): void => {
  app.post(
    `/${config.country}/api/coach`,
    Authentication.authenticate,
    CoachController.create
  );
  app.put(
    `/${config.country}/api/coach`,
    Authentication.authenticate,
    CoachController.update
  );
  app.delete(
    `/${config.country}/api/coach/:id`,
    Authentication.authenticate,
    CoachController.delete
  );
  app.get(
    `/${config.country}/api/coach/:id`,
    Authentication.authenticate,
    CoachController.findById
  );
  app.get(
    `/${config.country}/api/coach`,
    Authentication.authenticate,
    CoachController.findAll
  );
};

export default coachRouter;
