import { Application } from "express";
import Authentication from "../auth/service";
import CompetenceController from "./controller";

const competenceRouter = (app: Application): void => {
  app.post(
    "/competence",
    Authentication.authenticate,
    CompetenceController.create
  );
  app.put(
    "/competence",
    Authentication.authenticate,
    CompetenceController.update
  );
  app.delete(
    "/competence/:id",
    Authentication.authenticate,
    CompetenceController.delete
  );
  app.get(
    "/competence/:id",
    Authentication.authenticate,
    CompetenceController.findById
  );
  app.get(
    "/competence",
    Authentication.authenticate,
    CompetenceController.findAll
  );
};

export default competenceRouter;
