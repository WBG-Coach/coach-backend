import { Application } from "express";
import Authentication from "../auth/service";
import ImageController from "./controller";

const imageRouter = (app: Application): void => {
  app.post("/sl/api/image", Authentication.authenticate, ImageController.create);
  app.put("/sl/api/image", Authentication.authenticate, ImageController.update);
  app.delete("/sl/api/image/:id", Authentication.authenticate, ImageController.delete);
  app.get("/sl/api/image/:id", Authentication.authenticate, ImageController.findById);
  app.get("/sl/api/image", Authentication.authenticate, ImageController.findAll);
};

export default imageRouter;
