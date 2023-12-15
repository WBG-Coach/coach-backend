import { Application } from "express";
import Authentication from "../auth/service";
import RegionController from "./controller";
import config from "../../config";

const schoolRouter = (app: Application): void => {
  app.post(
    `/${config.country}/api/region`,
    Authentication.authenticate,
    RegionController.save
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
  app.get(
    `/${config.country}/api/region/tree`,
    Authentication.authenticate,
    RegionController.findAllTree
  );
  app.get(
    `/${config.country}/api/region/:id`,
    Authentication.authenticate,
    RegionController.findById
  );
};

export default schoolRouter;
