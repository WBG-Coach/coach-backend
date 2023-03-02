/* eslint-disable @typescript-eslint/indent */
import "reflect-metadata";
import config from "./config";
import { DataSource, Repository } from "typeorm";
import { User } from "./modules/user/entity";
const { database } = config;

export default class DBConnector {
  static connector: DataSource;

  static createConnection = async (): Promise<void> => {
    this.connector = new DataSource({
      ...database,
      logging: true,
      subscribers: [],
      type: "postgres",
      synchronize: true,
      migrations: ["src/migrations/*.ts"],
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
    });
  };

  static getUserRepository = async (): Promise<Repository<User>> => {
    return DBConnector.connector.getRepository(User);
  };
}
