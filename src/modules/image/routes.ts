import { Application } from "express";
import Authentication from "../auth/service";
import ImageController from "./controller";
import config from "../../config";

const imageRouter = (app: Application): void => {
  app.post(
    `/${config.country}/api/image`,
    Authentication.authenticate,
    ImageController.create
  );
  app.put(
    `/${config.country}api/image`,
    Authentication.authenticate,
    ImageController.update
  );
  app.delete(
    `/${config.country}/api/image/:id`,
    Authentication.authenticate,
    ImageController.delete
  );
  app.get(
    `/${config.country}/api/image/:id`,
    Authentication.authenticate,
    ImageController.findById
  );
  app.get(
    `/${config.country}/api/image`,
    Authentication.authenticate,
    ImageController.findAll
  );
};

export default imageRouter;
