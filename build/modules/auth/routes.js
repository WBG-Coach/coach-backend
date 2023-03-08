"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./service"));
const controller_1 = __importDefault(require("./controller"));
const AuthRouter = (app) => {
    app.post("/auth", controller_1.default.login);
    app.get("/auth", service_1.default.authenticate, (_req, res) => { var _a; return res.status(200).send((_a = res.locals) === null || _a === void 0 ? void 0 : _a.authUser); });
};
exports.default = AuthRouter;
