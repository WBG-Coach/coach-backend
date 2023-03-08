import dataSource from "./database/config/ormconfig";
import CoachServer from "./server";

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been connected!");
    CoachServer.start();
  })
  .catch((err) => {
    console.error("Error during Data Source connection:", err);
  });
