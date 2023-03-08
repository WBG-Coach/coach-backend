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
    "/questionnaire": {
      post: {
        tags: ["Questionnaire"],
        summary: "Create a new questionnaire",
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
                $ref: "#/components/schemas/QuestionnaireSchema",
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
                  $ref: "#/components/schemas/QuestionnaireSchema",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Questionnaire"],
        summary: "Update questionnaire",
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
                $ref: "#/components/schemas/QuestionnaireSchema",
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
        tags: ["Questionnaire"],
        summary: "Get all questionnaires",
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
                    $ref: "#/components/schemas/QuestionnaireSchema",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/questionnaire/{id}": {
      get: {
        tags: ["Questionnaire"],
        summary: "Get one questionnaire by ID",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Questionnaire id to delete",
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
                  $ref: "#/components/schemas/QuestionnaireSchema",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Questionnaire"],
        summary: "Delete questionnaire by ID",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Questionnaire id to delete",
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
    "/session": {
      post: {
        tags: ["Session"],
        summary: "Create a new session",
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
                $ref: "#/components/schemas/SessionSchema",
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
                  $ref: "#/components/schemas/SessionSchema",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Session"],
        summary: "Update session",
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
                $ref: "#/components/schemas/SessionSchema",
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
        tags: ["Session"],
        summary: "Get all sessions",
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
                    $ref: "#/components/schemas/SessionSchema",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/session/{id}": {
      get: {
        tags: ["Session"],
        summary: "Get one session by ID",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Session id to delete",
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
                  $ref: "#/components/schemas/SessionSchema",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Session"],
        summary: "Delete session by ID",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Session id to delete",
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
      QuestionnaireSchema: {
        properties: {
          id: {
            type: "string",
            example: "uuid",
          },
          title: {
            type: "string",
            example: "Questionnaire name",
          },
          active: {
            type: "boolean",
            example: true,
          },
        },
      },
      SessionSchema: {
        properties: {
          id: {
            type: "string",
            example: "uuid",
          },
          status: {
            type: "string",
            example: "Questionnaire name",
          },
          applicationDate: {
            type: "date",
            example: new Date(),
          },
          questionnaire: {
            type: "object",
            example: { id: "uuid" },
          },
          coache: {
            type: "object",
            example: { id: "uuid" },
          },
          school: {
            type: "object",
            example: { id: "uuid" },
          },
          teacher: {
            type: "object",
            example: { id: "uuid" },
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
