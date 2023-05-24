import { User } from "../../data/protocols";
import { EncrypterAdapter } from "./encrypter";
import * as jwt from "jsonwebtoken";

const USER: User = {
  id: "any_id",
  name: "any_name",
  email: "any@mail.com",
  password: "any_password"
}

jest.mock("jwt", () => ({
  sign(): string {
    return "token";
  }
}))

describe("Encrypter Adapter", () => {
  it("Should sign with correct values.", () => {
    const sut = new EncrypterAdapter();

    const sign = jest.spyOn(jwt, "sign");
    sut.handle(USER);

    expect(sign).toHaveBeenCalledWith(USER);
  })

  it("Should throw if sign throws.", () => {
    const sut = new EncrypterAdapter();

    jest.spyOn(jwt, "sign").mockImplementation(() => {
      throw new Error();
    });
    const response = sut.handle(USER);

    expect(response).rejects.toThrow();
  })

  it("Should return the correct values.", () => {
    const sut = new EncrypterAdapter();

    const response = sut.handle(USER);

    expect(response).toBe("token");
  })
})