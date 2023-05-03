import { Application } from "express";
import Authentication from "../auth/service";
import QuestionnaireController from "./controller";

const questionnaireRouter = (app: Application): void => {
  app.post(
    "/questionnaire",
    Authentication.authenticate,
    QuestionnaireController.create
  );
  app.put(
    "/questionnaire",
    Authentication.authenticate,
    QuestionnaireController.update
  );
  app.delete(
    "/questionnaire/:id",
    Authentication.authenticate,
    QuestionnaireController.delete
  );
  app.get(
    "/questionnaire/:id",
    Authentication.authenticate,
    QuestionnaireController.findById
  );
  app.get(
    "/questionnaire",
    Authentication.authenticate,
    QuestionnaireController.findAll
  );
};

export default questionnaireRouter;
