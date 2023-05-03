import { Application } from "express";
import SyncController from "./controller";

const SyncRouter = (app: Application): void => {
  app.post("/sync", SyncController.push);
  app.get("/sync", SyncController.pull);
};

export default SyncRouter;
