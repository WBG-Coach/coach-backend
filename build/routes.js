"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const router_1 = __importDefault(require("./modules/auth/router"));
const router_2 = __importDefault(require("./modules/user/router"));
const packageJson = require("../package.json");
const Routes = {
    setupRoutes: (app) => {
        (0, router_1.default)(app);
        (0, router_2.default)(app);
        app.get("/", (_req, res) => {
            res.send(`Coach API v${res.send(packageJson === null || packageJson === void 0 ? void 0 : packageJson.version)} is running.`);
        });
        app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup((0, swagger_jsdoc_1.default)({
            swaggerDefinition: {
                info: {
                    title: "API Example",
                    description: "API Example using Swagger",
                    version: "1.0.0",
                },
            },
            apis: ["./modules/*/controller/*.ts"],
        })));
        app.all("*", (_req, res) => res.status(404).send({ ERROR: true, message: "Check your URL please" }));
    },
};
exports.default = Routes;
