import { Application } from "express";
import Authentication from "../auth/service";
import CompetenceController from "./controller";

const competenceRouter = (app: Application): void => {
  app.post(
    "/sl/api/competence",
    Authentication.authenticate,
    CompetenceController.create
  );
  app.put(
    "/sl/api/competence",
    Authentication.authenticate,
    CompetenceController.update
  );
  app.delete(
    "/sl/api/competence/:id",
    Authentication.authenticate,
    CompetenceController.delete
  );
  app.get(
    "/sl/api/competence/:id",
    Authentication.authenticate,
    CompetenceController.findById
  );
  app.get(
    "/sl/api/competence",
    Authentication.authenticate,
    CompetenceController.findAll
  );
};

export default competenceRouter;
