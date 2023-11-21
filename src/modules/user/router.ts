import { Application } from "express";
import UserController from "./controller";
import Authentication from "../auth/service";
import config from "../../config";

const UserRouter = (app: Application): void => {
  app.get(`/${config.country}/api/users/coach`, UserController.findAllCoaches);
  app.post(`/${config.country}/api/users/coach/sign-up`, () => {});
  app.post(
    `/${config.country}/api/users/admin/sign-up`,
    Authentication.authenticate,
    UserController.signUpAdmin
  );
  app.get(
    `/${config.country}/api/users/admin`,
    Authentication.authenticate,
    UserController.findAllAdmins
  );
  app.patch(
    `/${config.country}/api/users/admin/:user_id`,
    Authentication.authenticate,
    UserController.updateAdmin
  );
  app.delete(
    `/${config.country}/api/users/admin/:user_id`,
    Authentication.authenticate,
    UserController.removeAdmin
  );
};

export default UserRouter;
