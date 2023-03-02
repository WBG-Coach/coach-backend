"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/indent */
require("reflect-metadata");
const config_1 = __importDefault(require("./config"));
const typeorm_1 = require("typeorm");
const entity_1 = require("./modules/user/entity");
const { database } = config_1.default;
class DBConnector {
}
exports.default = DBConnector;
_a = DBConnector;
DBConnector.createConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    _a.connector = new typeorm_1.DataSource(Object.assign(Object.assign({}, database), { logging: true, subscribers: [], type: "postgres", synchronize: true, migrations: ["src/migrations/*.ts"], entities: [__dirname + "/**/*.entity{.ts,.js}"] }));
});
DBConnector.getUserRepository = () => __awaiter(void 0, void 0, void 0, function* () {
    return DBConnector.connector.getRepository(entity_1.User);
});
