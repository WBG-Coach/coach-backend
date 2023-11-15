import { Application } from "express";
import Authentication from "../auth/service";
import TeacherController from "./controller";

const teacherRouter = (app: Application): void => {
  app.post("/sl/api/teacher", Authentication.authenticate, TeacherController.create);
  app.put("/sl/api/teacher", Authentication.authenticate, TeacherController.update);
  app.delete(
    "/sl/api/teacher/:id",
    Authentication.authenticate,
    TeacherController.delete
  );
  app.get(
    "/sl/api/teacher/:id",
    Authentication.authenticate,
    TeacherController.findById
  );
  app.get("/sl/api/teacher", Authentication.authenticate, TeacherController.findAll);
};

export default teacherRouter;
