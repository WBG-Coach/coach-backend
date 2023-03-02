"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnauthorizedException extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedException';
    }
}
exports.default = UnauthorizedException;
