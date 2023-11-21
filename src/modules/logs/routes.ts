import { Application } from "express";
import LogsController from "./controller";
import Authentication from "../auth/service";
import config from "../../config";

const LogRouter = (app: Application): void => {
  app.get(
    `/${config.country}/api/logs`,
    Authentication.authenticate,
    LogsController.findAll
  );
};

export default LogRouter;
