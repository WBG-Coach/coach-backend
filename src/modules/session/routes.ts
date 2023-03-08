import { Application } from "express";
import Authentication from "../auth/service";
import SessionController from "./controller";

const sessionRouter = (app: Application): void => {
  app.post("/session", Authentication.authenticate, SessionController.create);
  app.put("/session", Authentication.authenticate, SessionController.update);
  app.delete(
    "/session/:id",
    Authentication.authenticate,
    SessionController.delete
  );
  app.get(
    "/session/:id",
    Authentication.authenticate,
    SessionController.findById
  );
  app.get("/session", Authentication.authenticate, SessionController.findAll);
};

export default sessionRouter;
