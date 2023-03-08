"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    openapi: "3.0.1",
    info: {
        title: "REST API for Coach digital SL",
        version: "1.0.0",
    },
    schemes: ["http"],
    servers: [{ url: "http://localhost:3000/" }],
    paths: {
        "/auth": {
            post: {
                tags: ["Auth"],
                summary: "Login with Email and Password",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/LoginSchema",
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Success",
                        headers: {
                            token: {
                                description: "Token to authorize next requests",
                                schema: {
                                    type: "string",
                                },
                            },
                        },
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/UserSchema",
                                },
                            },
                        },
                    },
                    "401": {
                        description: "UnauthorizedException",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorSchema",
                                },
                            },
                        },
                    },
                },
            },
            get: {
                tags: ["Auth"],
                summary: "Get logged user",
                responses: {
                    "200": {
                        description: "Success",
                        headers: {
                            required: ["token"],
                            token: {
                                description: "Token to authorize next requests",
                                schema: {
                                    type: "string",
                                },
                            },
                        },
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/UserSchema",
                                },
                            },
                        },
                    },
                    "401": {
                        description: "UnauthorizedException",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/ErrorSchema",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            ErrorSchema: {
                properties: {
                    error: {
                        type: "string",
                        example: "UnauthorizedException",
                    },
                    message: {
                        type: "string",
                        example: "Invalid token",
                    },
                },
            },
            LoginSchema: {
                required: ["email", "password"],
                properties: {
                    email: {
                        type: "string",
                        example: "email@example.com",
                    },
                    password: {
                        type: "string",
                        example: "YourPassword",
                    },
                },
            },
            UserSchema: {
                properties: {
                    id: {
                        type: "string",
                        example: "uuid",
                    },
                    name: {
                        type: "string",
                        example: "User name",
                    },
                    email: {
                        type: "string",
                        example: "email@example.com",
                    },
                },
            },
        },
    },
};
