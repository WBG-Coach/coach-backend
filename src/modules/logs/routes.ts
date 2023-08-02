import { Application } from "express";
import LogsController from "./controller";
import Authentication from "../auth/service";

const LogRouter = (app: Application): void => {
  app.get("/logs", Authentication.authenticate, LogsController.findAll);
};

export default LogRouter;
