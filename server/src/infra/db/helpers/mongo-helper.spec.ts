import { MongoHelper as sut } from "./mongo-helper"

describe("MongoHelper", () => {
  beforeAll(async () => {
    await sut.connect();
  })

  afterAll(async () => {
    await sut.disconnect();
  })

  it("Should reconnect if mongodb down", async () => {
    let userCollection = await sut.getCollection("users");

    expect(userCollection).toBeTruthy();

    await sut.disconnect();

    userCollection = await sut.getCollection("users");

    expect(userCollection).toBeTruthy();
  })
})