export const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API Example",
      description: "API Example using Swagger",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerOptions;
