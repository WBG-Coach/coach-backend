import { DataSource } from "typeorm";
import config from "../../config";

const {
  database: { database, host, password, username, port },
} = config;

const dataSource = new DataSource({
  type: "postgres",
  host: host,
  port: port,
  username: username,
  password: password,
  database: database,
  synchronize: false,
  entities: [__dirname + "/../../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../migrations/**/*{.ts,.js}"],
});

export default dataSource;
