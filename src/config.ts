import { allowedOrigins } from "./constants";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

const config = {
  port,

  env: process.env.NODE_ENV || "production",

  allowedOrigins: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : allowedOrigins,

  secret: process.env.JWT_SECRET || "",

  database: {
    port: parseInt(process.env.DB_PORT || "5432", 10),
    host: process.env.DB_HOST || "",
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "",
  },
};

export default config;
