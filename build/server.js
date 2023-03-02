"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = __importDefault(require("./config"));
const { port } = config_1.default;
const CoachServer = {
    start: () => {
        const app = (0, express_1.default)();
        CoachServer.config(app);
        routes_1.default.setupRoutes(app);
        app.listen(port, () => console.log(`Listening on port ${port}...`));
        return app;
    },
    config: (app) => {
        app.use(body_parser_1.default.json());
        app.use((0, cors_1.default)({
            origin: (origin, callback) => {
                if (!origin)
                    return callback(null, true);
                return callback(null, true);
            },
        }));
    },
    close: (server) => {
        server.close(() => console.info("Coach Server was closed."));
    },
};
exports.default = CoachServer;
