import { Application } from "express";
import SyncController from "./controller";
import Authentication from "../auth/service";

const SyncRouter = (app: Application): void => {
  app.post("/sync", Authentication.authenticate, SyncController.findAll);
  app.post("/sync", SyncController.push);
  app.get("/sync", SyncController.pull);
};

export default SyncRouter;
