import { Application } from "express";
import UserController from "./controller";
import Authentication from "../auth/service";

const UserRouter = (app: Application): void => {
  app.get("/users/coach", UserController.findAllCoaches);
  app.post("/users/coach/sign-up", () => {});
  app.post(
    "/users/admin/sign-up",
    Authentication.authenticate,
    UserController.signUpAdmin
  );
  app.get(
    "/users/admin",
    Authentication.authenticate,
    UserController.findAllAdmins
  );
  app.patch(
    "/users/admin/:user_id",
    Authentication.authenticate,
    UserController.updateAdmin
  );
  app.delete(
    "/users/admin/:user_id",
    Authentication.authenticate,
    UserController.removeAdmin
  );
};

export default UserRouter;
