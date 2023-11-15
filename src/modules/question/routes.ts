import { Application } from "express";
import Authentication from "../auth/service";
import QuestionnaireController from "./controller";

const questionnaireRouter = (app: Application): void => {
  app.post(
    "/sl/api/questionnaire",
    Authentication.authenticate,
    QuestionnaireController.create
  );
  app.put(
    "/sl/api/questionnaire",
    Authentication.authenticate,
    QuestionnaireController.update
  );
  app.delete(
    "/sl/api/questionnaire/:id",
    Authentication.authenticate,
    QuestionnaireController.delete
  );
  app.get(
    "/sl/api/questionnaire/:id",
    Authentication.authenticate,
    QuestionnaireController.findById
  );
  app.get(
    "/sl/api/questionnaire",
    Authentication.authenticate,
    QuestionnaireController.findAll
  );
};

export default questionnaireRouter;
