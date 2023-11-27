import { Application, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./swaggerOptions";

import authRouter from "./modules/auth/routes";
import userRouter from "./modules/user/router";
import schoolRouter from "./modules/school/routes";
import regionRouter from "./modules/region/routes";
import teacherRouter from "./modules/teacher/routes";
import sessionRouter from "./modules/session/routes";
import questionRouter from "./modules/question/routes";
import competenceRouter from "./modules/competencies/routes";
import syncRouter from "./modules/sync/routes";
import coachRouter from "./modules/coach/routes";
import imageRouter from "./modules/image/routes";
import logRouter from "./modules/logs/routes";
import dashboardRouter from "./modules/dashboard/routes";
import config from "./config";

const packageJson: any = require("../package.json");

const Routes = {
  setupRoutes: (app: Application): void => {
    syncRouter(app);
    authRouter(app);
    userRouter(app);
    imageRouter(app);
    coachRouter(app);
    schoolRouter(app);
    regionRouter(app);
    schoolRouter(app);
    sessionRouter(app);
    teacherRouter(app);
    questionRouter(app);
    dashboardRouter(app);
    competenceRouter(app);
    logRouter(app);

    app.get(`/${config.country}/api/`, (_req: Request, res: Response) => {
      res.send(
        `Coach API ${config.country} v${packageJson?.version} is running.`
      );
    });

    app.use(
      `/${config.country}/api/docs`,
      swaggerUi.serve,
      swaggerUi.setup(swaggerOptions)
    );

    app.all("*", (req: Request, res: Response): Response => {
      console.log(req.path);
      return res
        .status(404)
        .send({ error: 404, message: "Check your URL please" });
    });
  },
};

export default Routes;
