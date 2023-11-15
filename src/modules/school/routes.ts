import { Application } from "express";
import Authentication from "../auth/service";
import SchoolController from "./controller";

const schoolRouter = (app: Application): void => {
  app.post("/sl/api/school", Authentication.authenticate, SchoolController.create);
  app.put("/sl/api/school", Authentication.authenticate, SchoolController.update);
  app.delete(
    "/sl/api/school/:id",
    Authentication.authenticate,
    SchoolController.delete
  );
  app.get(
    "/sl/api/school/:id",
    Authentication.authenticate,
    SchoolController.findById
  );
  app.get(
    "/sl/api/school/qrcode/:id",
    Authentication.authenticate,
    SchoolController.generateKey
  );
  app.get("/sl/api/school", Authentication.authenticate, SchoolController.findAll);
  app.get(
    "/sl/api/school/:region/districts",
    Authentication.authenticate,
    SchoolController.findAllDistrictsByRegion
  );
};

export default schoolRouter;
