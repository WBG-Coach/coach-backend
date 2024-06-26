import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Routes from "./routes";
import config from "./config";
import { Server } from "http";
const { port } = config;

const CoachServer = {
  start: (): { app: Application; server: Server } => {
    const app: Application = express();
    CoachServer.config(app);
    Routes.setupRoutes(app);

    const server = app.listen(port, () =>
      console.log(`Listening on port ${port}...`)
    );

    server.setTimeout(500000);

    return { server, app };
  },

  config: (app: Application): void => {
    app.use(bodyParser.json({ limit: "50mb" }));

    app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin) return callback(null, true);
          return callback(null, true);
        },
      })
    );

    app.use((err: any, _req: any, res: any, _next: any) => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    });
  },

  close: (server: Server): void => {
    server.close(() => console.info("Coach Server was closed."));
  },
};
export default CoachServer;
