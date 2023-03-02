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
exports.UserService = void 0;
const db_connector_1 = __importDefault(require("../../../db-connector"));
class UserService {
}
exports.UserService = UserService;
_a = UserService;
UserService.findUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = yield db_connector_1.default.getUserRepository();
    return userRepository.findOne({ where: { id } });
});
UserService.findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = yield db_connector_1.default.getUserRepository();
    return userRepository.findOne({ where: { email } });
});
