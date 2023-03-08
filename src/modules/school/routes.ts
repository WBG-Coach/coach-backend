import { Application } from "express";
import Authentication from "../auth/service";
import SchoolController from "./controller";

const schoolRouter = (app: Application): void => {
  app.post("/school", Authentication.authenticate, SchoolController.create);
  app.put("/school", Authentication.authenticate, SchoolController.update);
  app.delete(
    "/school/:id",
    Authentication.authenticate,
    SchoolController.delete
  );
  app.get(
    "/school/:id",
    Authentication.authenticate,
    SchoolController.findById
  );
  app.get("/school", Authentication.authenticate, SchoolController.findAll);
};

export default schoolRouter;
