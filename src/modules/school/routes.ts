import { Application } from "express";
import Authentication from "../auth/service";
import SchoolController from "./controller";
import config from "../../config";

const schoolRouter = (app: Application): void => {
  app.post(
    `/${config.country}/api/school`,
    Authentication.authenticate,
    SchoolController.create
  );
  app.put(
    `/${config.country}/api/school`,
    Authentication.authenticate,
    SchoolController.update
  );
  app.delete(
    `/${config.country}/api/school/:id`,
    Authentication.authenticate,
    SchoolController.delete
  );
  app.get(
    `/${config.country}/api/school/:id`,
    Authentication.authenticate,
    SchoolController.findById
  );
  app.get(
    `/${config.country}/api/school/qrcode/:id`,
    Authentication.authenticate,
    SchoolController.generateKey
  );
  app.get(
    `/${config.country}/api/school`,
    Authentication.authenticate,
    SchoolController.findAll
  );
  app.get(
    `/${config.country}/api/school/:regionId`,
    Authentication.authenticate,
    SchoolController.findAll
  );
};

export default schoolRouter;
