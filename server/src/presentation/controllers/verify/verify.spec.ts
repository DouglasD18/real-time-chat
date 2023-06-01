import { User } from "@/data/protocols";
import { VerifyController } from "./verify";
import { IVerify } from "./verify-protocols";
import { InvalidParamError, MissingParamError, ServerError } from "../login/login-protocols";

const USER: User = {
  id: "any_id",
  name: "any_name",
  cpf: "any@mail.com",
  password: "any_password"
}

const NAME = USER.name;
const TOKEN = "any_token";

interface SutTypes {
  sut: VerifyController
  verifyStub: IVerify
}

const makeVerifyStub = (): IVerify => {
  class VerifyStub implements IVerify {
    handle(token: string): Promise<User> {
      return new Promise(resolve => resolve(USER));
    }
  }

  return new VerifyStub();
}

const makeSut = (): SutTypes => {
  const verifyStub = makeVerifyStub();
  const sut = new VerifyController(verifyStub);

  return {
    sut,
    verifyStub
  }
}

describe('Verify Controller', () => {
  it('Should return 400 if no token is provided.', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {}
    }

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("token"));
  })

  it('Should call IVerify with correct values.', async () => {
    const { sut, verifyStub } = makeSut();
    const httpRequest = {
      body: {
        token: TOKEN
      }
    }
    
    const handleSpy = jest.spyOn(verifyStub, "handle");
    sut.handle(httpRequest);

    expect(handleSpy).toHaveBeenCalledWith(TOKEN);
  })

  it('Should return 401 if IVerify have no return.', async () => {
    const { sut, verifyStub } = makeSut();
    const httpRequest = {
      body: {
        token: TOKEN
      }
    }
    
    jest.spyOn(verifyStub, "handle").mockImplementationOnce(() => {
      return new Promise(resolve => resolve(null))
    })
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toEqual(new InvalidParamError("token", "Token inválido!"));
  })

  it('Should return 500 if IVerify throws', async () => {
    const { sut, verifyStub } = makeSut();
    const httpRequest = {
      body: {
        token: TOKEN
      }
    }
    
    jest.spyOn(verifyStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  })

  it('Should return 200 if valid values is provided.', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        token: TOKEN
      }
    }
    
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({ name: NAME });
  })
})
