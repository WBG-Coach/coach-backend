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
const http2_1 = require("http2");
const { HTTP_STATUS_OK } = http2_1.constants;
const service_1 = __importDefault(require("../service"));
class AuthenticationController {
}
exports.default = AuthenticationController;
_a = AuthenticationController;
AuthenticationController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield service_1.default.authenticateUser(req);
        res.locals.authUser = user;
        service_1.default.signUser(user, res);
        const { id, name, email } = user;
        const result = {
            id,
            name,
            email,
        };
        return res.status(HTTP_STATUS_OK).send(result);
    }
    catch (error) {
        service_1.default.unauthorize(res, error);
    }
});
