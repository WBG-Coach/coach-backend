import { Application } from "express";
import Authentication from "../auth/service";
import DashboardController from "./controller";

const dashboardRouter = (app: Application): void => {
  app.get(
    "/sl/api/dashboard",
    Authentication.authenticate,
    DashboardController.getData
  );
  app.get(
    "/sl/api/dashboard/insert-mock",
    // Authentication.authenticate,
    DashboardController.insertMock
  );
};

export default dashboardRouter;
