"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
exports.swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "API Example",
            description: "API Example using Swagger",
            version: "1.0.0",
        },
    },
    apis: ["./routes/*.js"],
};
module.exports = exports.swaggerOptions;
