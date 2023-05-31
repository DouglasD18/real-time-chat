import request from 'supertest';
import app from '../config/app';

const USER = {
  name: "douglinhas",
  email: "mail@mail.com",
  password: "password"
}

describe("Routes", () => {
  beforeAll(async () => {
    await request(app)
      .post("/api/users/login/")
      .send({ USER })
  })

  describe("SignUp Router", () => {
    const ROUTE = "/api/users/login/";

    it("Should return 400 if any param is no provided", async () => {
      await request(app)
        .post(ROUTE)
        .send({
          name: "douglinhas",
          email: "mail@mail.com"
        })
        .expect(400)
    })

    it("Should return 400 if password length is less than 6", async () => {
      await request(app)
        .post(ROUTE)
        .send({
          name: "douglinhas",
          email: "mail@mail.com",
          password: "pass"
        })
        .expect(400)
    })

    it("Should return 201 on success", async () => {
      await request(app)
        .post(ROUTE)
        .send({
          name: "any_name",
          email: "any@mail.com",
          password: "password"
        })
        .expect(201)
    })
  })

  describe("Login Router", () => {
    const ROUTE = "/api/users/login/";

    it("Should return 400 if any param is no provided", async () => {
      await request(app)
        .get(ROUTE)
        .send({
          email: "douglinhas"
        })
        .expect(400)
    })

    it("Should return 400 if password length is less than 6", async () => {
      await request(app)
        .get(ROUTE)
        .send({
          email: "mail@mail.com",
          password: "pass"
        })
        .expect(400)
    })

    it("Should return 404 if user is not found", async () => {
      await request(app)
        .get(ROUTE)
        .send({
          email: "mail@mail.com",
          password: "password"
        })
        .expect(404)
    })
  })

  describe("Verify Router", () => {
    const ROUTE = "/api/users/verify/";

    it("Should return 400 if token is no provided", async () => {
      await request(app)
        .get(ROUTE)
        .send({})
        .expect(400)
    })

    it("Should return 401 if token as invalid", async () => {
      await request(app)
        .get(ROUTE)
        .send({
          token: "any_token"
        })
        .expect(401)
    })
  })

})