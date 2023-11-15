import { Application } from "express";
import SyncController from "./controller";
import Authentication from "../auth/service";

const SyncRouter = (app: Application): void => {
  app.get("/sl/api/sync/list", Authentication.authenticate, SyncController.findAll);
  app.post("/sl/api/sync", SyncController.push);
};

export default SyncRouter;
