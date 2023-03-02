"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InternalServerError';
    }
}
exports.default = InternalServerError;
