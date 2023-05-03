import { Application } from "express";
import UserController from "./controller";
import Authentication from "../auth/service";

const UserRouter = (app: Application): void => {
  app.post("/users/coach/sign-up", () => {});
  app.get("/users/coach", UserController.findAll);
};

export default UserRouter;
