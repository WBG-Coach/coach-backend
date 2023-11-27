import { Application } from "express";
import Authentication from "../auth/service";
import RegionController from "./controller";
import config from "../../config";

const schoolRouter = (app: Application): void => {
  app.post(
    `/${config.country}/api/region`,
    Authentication.authenticate,
    RegionController.create
  );
  app.patch(
    `/${config.country}/api/region/:id`,
    Authentication.authenticate,
    RegionController.update
  );
  app.delete(
    `/${config.country}/api/region/:id`,
    Authentication.authenticate,
    RegionController.delete
  );
  app.get(
    `/${config.country}/api/region`,
    Authentication.authenticate,
    RegionController.findAll
  );
};

export default schoolRouter;
