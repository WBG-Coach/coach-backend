import { Application, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swaggerOptions";

import authRouter from "./modules/auth/routes";
import userRouter from "./modules/user/router";
import guideRouter from "./modules/guide/routes";
import competenceRouter from "./modules/competencies/routes";
const packageJson: any = require("../package.json");

const Routes = {
  setupRoutes: (app: Application): void => {
    authRouter(app);
    userRouter(app);
    guideRouter(app);
    competenceRouter(app);

    app.get("/", (_req: Request, res: Response) => {
      res.send(`Coach API v${packageJson?.version} is running.`);
    });

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

    app.all(
      "*",
      (_req: Request, res: Response): Response =>
        res.status(404).send({ error: 404, message: "Check your URL please" })
    );
  },
};

export default Routes;
