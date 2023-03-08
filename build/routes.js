"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOptions_1 = __importDefault(require("./swaggerOptions"));
const routes_1 = __importDefault(require("./modules/auth/routes"));
const router_1 = __importDefault(require("./modules/user/router"));
const packageJson = require("../package.json");
const Routes = {
    setupRoutes: (app) => {
        (0, routes_1.default)(app);
        (0, router_1.default)(app);
        app.get("/", (_req, res) => {
            res.send(`Coach API v${res.send(packageJson === null || packageJson === void 0 ? void 0 : packageJson.version)} is running.`);
        });
        app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerOptions_1.default));
        app.all("*", (_req, res) => res.status(404).send({ ERROR: true, message: "Check your URL please" }));
    },
};
exports.default = Routes;
