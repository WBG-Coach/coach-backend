import { Application } from "express";
import Authentication from "../auth/service";
import DashboardController from "./controller";
import config from "../../config";

const dashboardRouter = (app: Application): void => {
  app.get(
    `/${config.country}/api/dashboard`,
    Authentication.authenticate,
    DashboardController.getData
  );
};

export default dashboardRouter;
