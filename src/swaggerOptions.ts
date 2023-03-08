export default {
  openapi: "3.0.1",
  info: {
    title: "REST API for Coach digital SL",
    version: "1.0.0",
  },
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
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Success",
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
    "/guide": {
      post: {
        tags: ["Guide"],
        summary: "Create a new guide",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/GuideSchema",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/GuideSchema",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Guide"],
        summary: "Update guide",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/GuideSchema",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Success",
          },
        },
      },
      get: {
        tags: ["Guide"],
        summary: "Get all guides",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/GuideSchema",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/guide/{id}": {
      get: {
        tags: ["Guide"],
        summary: "Get one guide by ID",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Guide id to delete",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/GuideSchema",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Guide"],
        summary: "Delete guide by ID",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Guide id to delete",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Success",
          },
        },
      },
    },
    "/competence": {
      post: {
        tags: ["Competence"],
        summary: "Create a new competence",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CompetenceSchema",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CompetenceSchema",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Competence"],
        summary: "Update competence",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CompetenceSchema",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Success",
          },
        },
      },
      get: {
        tags: ["Competence"],
        summary: "Get all competences",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/CompetenceSchema",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/competence/{id}": {
      get: {
        tags: ["Competence"],
        summary: "Get one competence by ID",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Competence id to delete",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CompetenceSchema",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Competence"],
        summary: "Delete competence by ID",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Competence id to delete",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Success",
          },
        },
      },
    },
    "/school": {
      post: {
        tags: ["School"],
        summary: "Create a new school",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SchoolSchema",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SchoolSchema",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["School"],
        summary: "Update school",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SchoolSchema",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Success",
          },
        },
      },
      get: {
        tags: ["School"],
        summary: "Get all schools",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/SchoolSchema",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/school/{id}": {
      get: {
        tags: ["School"],
        summary: "Get one school by ID",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "School id to delete",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SchoolSchema",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["School"],
        summary: "Delete school by ID",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "School id to delete",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Success",
          },
        },
      },
    },
    "/teacher": {
      post: {
        tags: ["Teacher"],
        summary: "Create a new teacher",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TeacherSchema",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TeacherSchema",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Teacher"],
        summary: "Update teacher",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TeacherSchema",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Success",
          },
        },
      },
      get: {
        tags: ["Teacher"],
        summary: "Get all teachers",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/TeacherSchema",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/teacher/{id}": {
      get: {
        tags: ["Teacher"],
        summary: "Get one teacher by ID",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Teacher id to delete",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TeacherSchema",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Teacher"],
        summary: "Delete teacher by ID",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Teacher id to delete",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Success",
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
      GuideSchema: {
        properties: {
          id: {
            type: "string",
            example: "uuid",
          },
          content: {
            type: "string",
            example: "User name",
          },
        },
      },
      CompetenceSchema: {
        properties: {
          id: {
            type: "string",
            example: "uuid",
          },
          title: {
            type: "string",
            example: "Competence name",
          },
          guide: {
            type: "object",
            example: { id: "uuid" },
          },
        },
      },
      SchoolSchema: {
        properties: {
          id: {
            type: "string",
            example: "uuid",
          },
          name: {
            type: "string",
            example: "School name",
          },
        },
      },
      TeacherSchema: {
        properties: {
          id: {
            type: "string",
            example: "uuid",
          },
          name: {
            type: "string",
            example: "School name",
          },
        },
      },
    },

    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
