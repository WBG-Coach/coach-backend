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

    return { server, app };
  },

  config: (app: Application): void => {
    app.use(bodyParser.json({ limit: "100mb" }));

    app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin) return callback(null, true);
          return callback(null, true);
        },
      })
    );
  },

  close: (server: Server): void => {
    server.close(() => console.info("Coach Server was closed."));
  },
};
export default CoachServer;
