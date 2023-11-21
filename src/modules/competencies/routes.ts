import { Application } from "express";
import Authentication from "../auth/service";
import CompetenceController from "./controller";
import config from "../../config";

const competenceRouter = (app: Application): void => {
  app.post(
    `/${config.country}/api/competence`,
    Authentication.authenticate,
    CompetenceController.create
  );
  app.put(
    `/${config.country}/api/competence`,
    Authentication.authenticate,
    CompetenceController.update
  );
  app.delete(
    `/${config.country}/api/competence/:id`,
    Authentication.authenticate,
    CompetenceController.delete
  );
  app.get(
    `/${config.country}/api/competence/:id`,
    Authentication.authenticate,
    CompetenceController.findById
  );
  app.get(
    `/${config.country}/api/competence`,
    Authentication.authenticate,
    CompetenceController.findAll
  );
};

export default competenceRouter;
