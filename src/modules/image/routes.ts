import { Application } from "express";
import Authentication from "../auth/service";
import ImageController from "./controller";

const imageRouter = (app: Application): void => {
  app.post("/guide", Authentication.authenticate, ImageController.create);
  app.put("/guide", Authentication.authenticate, ImageController.update);
  app.delete("/guide/:id", Authentication.authenticate, ImageController.delete);
  app.get("/guide/:id", Authentication.authenticate, ImageController.findById);
  app.get("/guide", Authentication.authenticate, ImageController.findAll);
};

export default imageRouter;
