/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "ts", "json", "node"],

  roots: ["<rootDir>/src"],

  testMatch: ["**/__tests__/*.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
