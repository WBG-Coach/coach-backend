import { Application } from "express";
import Authentication from "../auth/service";
import CoachController from "./controller";

const coachRouter = (app: Application): void => {
  app.post("/coach", Authentication.authenticate, CoachController.create);
  app.put("/coach", Authentication.authenticate, CoachController.update);
  app.delete("/coach/:id", Authentication.authenticate, CoachController.delete);
  app.get("/coach/:id", Authentication.authenticate, CoachController.findById);
  app.get("/coach", Authentication.authenticate, CoachController.findAll);
};

export default coachRouter;
