import { Application } from "express";
import Authentication from "../auth/service";
import QuestionnaireController from "./controller";
import config from "../../config";

const questionnaireRouter = (app: Application): void => {
  app.post(
    `/${config.country}/api/questionnaire`,
    Authentication.authenticate,
    QuestionnaireController.create
  );
  app.put(
    `/${config.country}/api/questionnaire`,
    Authentication.authenticate,
    QuestionnaireController.update
  );
  app.delete(
    `/${config.country}/api/questionnaire/:id`,
    Authentication.authenticate,
    QuestionnaireController.delete
  );
  app.get(
    `/${config.country}/api/questionnaire/:id`,
    Authentication.authenticate,
    QuestionnaireController.findById
  );
  app.get(
    `/${config.country}/api/questionnaire`,
    Authentication.authenticate,
    QuestionnaireController.findAll
  );
};

export default questionnaireRouter;
