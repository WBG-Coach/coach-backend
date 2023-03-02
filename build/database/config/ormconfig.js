"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("../../config"));
const { database: { database, host, password, username, port }, } = config_1.default;
const dataSource = new typeorm_1.DataSource({
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
exports.default = dataSource;
