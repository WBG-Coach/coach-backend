import { Application } from "express";
import UserController from "./controller";
import Authentication from "../auth/service";

const UserRouter = (app: Application): void => {
  app.get("/sl/api/users/coach", UserController.findAllCoaches);
  app.post("/sl/api/users/coach/sign-up", () => {});
  app.post(
    "/sl/api/users/admin/sign-up",
    Authentication.authenticate,
    UserController.signUpAdmin
  );
  app.get(
    "/sl/api/users/admin",
    Authentication.authenticate,
    UserController.findAllAdmins
  );
  app.patch(
    "/sl/api/users/admin/:user_id",
    Authentication.authenticate,
    UserController.updateAdmin
  );
  app.delete(
    "/sl/api/users/admin/:user_id",
    Authentication.authenticate,
    UserController.removeAdmin
  );
};

export default UserRouter;
