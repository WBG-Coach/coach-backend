import { Application, Request, Response } from "express";

import authRouter from "./modules/auth/router";
import userRouter from "./modules/user/router";
const packageJson: any = require("../package.json");

const Routes = {
  setupRoutes: (app: Application): void => {
    authRouter(app);
    userRouter(app);

    app.get("/", (_req: Request, res: Response) => {
      res.send(`Coach API v${res.send(packageJson?.version)} is running.`);
    });

    app.all(
      "*",
      (_req: Request, res: Response): Response =>
        res.status(404).send({ ERROR: true, message: "Check your URL please" })
    );
  },
};

export default Routes;
