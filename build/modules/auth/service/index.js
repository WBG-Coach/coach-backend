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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config"));
const http2_1 = require("http2");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const unauthorized_exception_1 = __importDefault(require("../../helpers/errors/unauthorized-exception"));
const internal_server_error_1 = __importDefault(require("../../helpers/errors/internal-server-error"));
const user_entity_1 = require("../../user/entity/user.entity");
const ormconfig_1 = __importDefault(require("../../../database/config/ormconfig"));
const { HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_UNAUTHORIZED } = http2_1.constants;
const { secret } = config_1.default;
class Authentication {
}
exports.default = Authentication;
_a = Authentication;
Authentication.getBearerToken = (req) => {
    var _b, _c;
    try {
        return (_c = (_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.authorization) === null || _c === void 0 ? void 0 : _c.split(" ")[1];
    }
    catch (error) {
        return undefined;
    }
};
Authentication.verifyJWT = (token) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
Authentication.unauthorize = (res, error) => {
    const status = error instanceof unauthorized_exception_1.default
        ? HTTP_STATUS_UNAUTHORIZED
        : HTTP_STATUS_INTERNAL_SERVER_ERROR;
    res.status(status).send({
        error: error.name,
        message: error.message,
    });
};
Authentication.authenticateUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email) {
        return Promise.reject(new unauthorized_exception_1.default("Email not found."));
    }
    try {
        const userRepository = yield ormconfig_1.default.getRepository(user_entity_1.User);
        const user = yield userRepository.findOne({
            where: { email },
        });
        if (!user)
            return Promise.reject(new unauthorized_exception_1.default("Email or password is invalid."));
        return user
            .verifyIsSamePassword(password)
            .then(() => user)
            .catch(() => {
            return Promise.reject(new unauthorized_exception_1.default("Email ou Senha incorretos."));
        });
    }
    catch (error) {
        console.log({ error });
        return Promise.reject(new internal_server_error_1.default("Internal server error."));
    }
});
Authentication.getAuthenticatedUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = yield ormconfig_1.default.getRepository(user_entity_1.User);
    const user = yield userRepository.findOne({ where: { email } });
    if (!user) {
        throw new unauthorized_exception_1.default("Invalid token");
    }
    const { password } = user, userWithoutPassword = __rest(user, ["password"]);
    return new user_entity_1.User(userWithoutPassword);
});
Authentication.signUser = (user, res) => {
    const payload = { email: user.email, sub: user.id };
    const newToken = jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: 604800, // expires in 7 days
    });
    res.setHeader("token", newToken);
    res.setHeader("Access-Control-Allow-Headers", "true");
    res.setHeader("Access-Control-Expose-Headers", "token");
};
Authentication.authenticate = (req, res, next) => {
    try {
        const token = Authentication.getBearerToken(req);
        if (!token)
            return Authentication.unauthorize(res, new unauthorized_exception_1.default("Token didn't send."));
        const user = Authentication.verifyJWT(token);
        Authentication.getAuthenticatedUser(user.email)
            .then((user) => {
            res.locals.authUser = user;
            next();
        })
            .catch((error) => {
            return Authentication.unauthorize(res, error);
        });
    }
    catch (error) {
        return Authentication.unauthorize(res, new unauthorized_exception_1.default("Invalid token."));
    }
};
