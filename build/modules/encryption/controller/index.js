"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class Encryption {
}
exports.default = Encryption;
Encryption.encrypt = (value, salt) => {
    return new Promise((resolve, reject) => {
        crypto_1.default.pbkdf2(value, salt, 1000, 64, "sha512", (err, derivedKey) => {
            if (err)
                return reject(err);
            const hash = derivedKey.toString("hex");
            resolve(hash);
        });
    });
};
