import { Application } from "express";
import { Server } from "http";
import request, { Test } from "supertest";
import CoachServer from "../../../server";
import { User } from "../../user/entity";

const mockedUser = new User({
  id: "1",
  name: "User",
  email: "email@email.com",
  password:
    "19839a741610fd0efb262f0daf84a16bce1df44b7b5120c875cf00bb996358cacc32914a4cad1379882d4faa530f0256acf726471ba3cbf49383ebddaca6fdb0",
});

jest.mock("../../../database/config/ormconfig", () => ({
  getRepository: () => ({
    findOne: () => mockedUser,
  }),
}));

let app: Application;
let server: Server;

describe("POST /auth", () => {
  beforeAll(() => {
    const start = CoachServer.start();
    app = start.app;
    server = start.server;
  });

  afterAll(() => {
    server.close();
  });

  it("should return token when email and password is correct", async () => {
    const res = await request(app)
      .post("/auth")
      .send({ email: "email@email.com", password: "123456" });

    expect(res.statusCode).toEqual(200);
    expect(res.headers.token).toBeDefined();
  });

  it("should return 401 when email and password isn't correct", async () => {
    const res = await request(app)
      .post("/auth")
      .send({ email: "email@email.com", password: "654321" });

    expect(res.statusCode).toEqual(401);
  });
});
