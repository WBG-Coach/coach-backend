import { Application } from "express";
import Authentication from "../auth/service";
import DashboardController from "./controller";

const dashboardRouter = (app: Application): void => {
  app.get(
    "/dashboard",
    Authentication.authenticate,
    DashboardController.getData
  );
  app.post(
    "/dashboard/insert-mock",
    // Authentication.authenticate,
    DashboardController.getData
  );
};

export default dashboardRouter;
