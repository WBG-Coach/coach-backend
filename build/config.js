"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const config = {
    port,
    env: process.env.NODE_ENV || "production",
    allowedOrigins: process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(",")
        : constants_1.allowedOrigins,
    secret: process.env.JWT_SECRET || "",
    database: {
        port: parseInt(process.env.DB_PORT || "5432", 10),
        host: process.env.DB_HOST || "",
        username: process.env.DB_USERNAME || "",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_DATABASE || "",
    },
};
exports.default = config;
