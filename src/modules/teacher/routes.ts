import { Application } from "express";
import Authentication from "../auth/service";
import TeacherController from "./controller";
import config from "../../config";

const teacherRouter = (app: Application): void => {
  app.post(
    `/${config.country}/api/teacher`,
    Authentication.authenticate,
    TeacherController.create
  );
  app.put(
    `/${config.country}/api/teacher`,
    Authentication.authenticate,
    TeacherController.update
  );
  app.delete(
    `/${config.country}/api/teacher/:id`,
    Authentication.authenticate,
    TeacherController.delete
  );
  app.get(
    `/${config.country}/api/teacher/:id`,
    Authentication.authenticate,
    TeacherController.findById
  );
  app.get(
    `/${config.country}/api/teacher`,
    Authentication.authenticate,
    TeacherController.findAll
  );
};

export default teacherRouter;
