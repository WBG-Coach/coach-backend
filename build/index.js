"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ormconfig_1 = __importDefault(require("./database/config/ormconfig"));
const server_1 = __importDefault(require("./server"));
ormconfig_1.default
    .initialize()
    .then(() => {
    console.log("Data Source has been connected!");
    server_1.default.start();
})
    .catch((err) => {
    console.error("Error during Data Source connection:", err);
});
