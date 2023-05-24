import { Application, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swaggerOptions";

import authRouter from "./modules/auth/routes";
import userRouter from "./modules/user/router";
import schoolRouter from "./modules/school/routes";
import teacherRouter from "./modules/teacher/routes";
import sessionRouter from "./modules/session/routes";
import questionRouter from "./modules/question/routes";
import competenceRouter from "./modules/competencies/routes";
import syncRouter from "./modules/sync/routes";
import coachRouter from "./modules/coach/routes";

const packageJson: any = require("../package.json");

const Routes = {
  setupRoutes: (app: Application): void => {
    coachRouter(app);
    syncRouter(app);
    authRouter(app);
    userRouter(app);
    schoolRouter(app);
    sessionRouter(app);
    teacherRouter(app);
    questionRouter(app);
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
