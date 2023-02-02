import { Application } from "express";

const UserRouter = (app: Application): void => {
  app.post("/users/coach/sign-up", () => {});
};

export default UserRouter;
