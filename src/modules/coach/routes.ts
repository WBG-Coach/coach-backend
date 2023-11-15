import { Application } from "express";
import Authentication from "../auth/service";
import CoachController from "./controller";

const coachRouter = (app: Application): void => {
  app.post("/sl/api/coach", Authentication.authenticate, CoachController.create);
  app.put("/sl/api/coach", Authentication.authenticate, CoachController.update);
  app.delete("/sl/api/coach/:id", Authentication.authenticate, CoachController.delete);
  app.get("/sl/api/coach/:id", Authentication.authenticate, CoachController.findById);
  app.get("/sl/api/coach", Authentication.authenticate, CoachController.findAll);
};

export default coachRouter;
