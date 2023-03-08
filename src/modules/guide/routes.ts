import { Application } from "express";
import Authentication from "../auth/service";
import GuideController from "./controller";

const guideRouter = (app: Application): void => {
  app.post("/guide", Authentication.authenticate, GuideController.create);
  app.put("/guide", Authentication.authenticate, GuideController.update);
  app.delete("/guide/:id", Authentication.authenticate, GuideController.delete);
  app.get("/guide/:id", Authentication.authenticate, GuideController.findById);
  app.get("/guide", Authentication.authenticate, GuideController.findAll);
};

export default guideRouter;
