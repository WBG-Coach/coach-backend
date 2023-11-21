import { Application } from "express";
import SyncController from "./controller";
import Authentication from "../auth/service";
import config from "../../config";

const SyncRouter = (app: Application): void => {
  app.get(
    `/${config.country}/api/sync/list`,
    Authentication.authenticate,
    SyncController.findAll
  );
  app.post(`/${config.country}/api/sync`, SyncController.push);
};

export default SyncRouter;
