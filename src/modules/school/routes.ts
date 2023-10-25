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
  app.get(
    "/school/qrcode/:id",
    Authentication.authenticate,
    SchoolController.generateKey
  );
  app.get("/school", Authentication.authenticate, SchoolController.findAll);
  app.get(
    "/school/:region/districts",
    Authentication.authenticate,
    SchoolController.findAllDistrictsByRegion
  );
};

export default schoolRouter;
