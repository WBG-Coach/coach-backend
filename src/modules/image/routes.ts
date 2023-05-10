import { Application } from "express";
import Authentication from "../auth/service";
import ImageController from "./controller";

const imageRouter = (app: Application): void => {
  app.post("/image", Authentication.authenticate, ImageController.create);
  app.put("/image", Authentication.authenticate, ImageController.update);
  app.delete("/image/:id", Authentication.authenticate, ImageController.delete);
  app.get("/image/:id", Authentication.authenticate, ImageController.findById);
  app.get("/image", Authentication.authenticate, ImageController.findAll);
};

export default imageRouter;
