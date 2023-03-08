import { Application } from "express";
import Authentication from "../auth/service";
import TeacherController from "./controller";

const teacherRouter = (app: Application): void => {
  app.post("/teacher", Authentication.authenticate, TeacherController.create);
  app.put("/teacher", Authentication.authenticate, TeacherController.update);
  app.delete(
    "/teacher/:id",
    Authentication.authenticate,
    TeacherController.delete
  );
  app.get(
    "/teacher/:id",
    Authentication.authenticate,
    TeacherController.findById
  );
  app.get("/teacher", Authentication.authenticate, TeacherController.findAll);
};

export default teacherRouter;
