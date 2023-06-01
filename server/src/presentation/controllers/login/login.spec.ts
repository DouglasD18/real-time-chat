import { LoginController } from "./login";
import { ILogin, InvalidParamError, MissingParamError, NotFoundError, ServerError, UserLogin } from "./login-protocols";

interface SutTypes {
  sut: LoginController
  loginStub: ILogin
}

const makeLoginStub = (): ILogin => {
  class LoginStub implements ILogin {
    async handle(user: UserLogin): Promise<string> {
      return new Promise(resolve => resolve("token"));
    }
  }

  return new LoginStub();
}

const makeSut = (): SutTypes => {
  const loginStub = makeLoginStub();
  const sut = new LoginController(loginStub);

  return {
    sut,
    loginStub
  }
}

describe('Login Controller', () => {
  it('Should return 400 if cpf is no provided.', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: "my_password"
      }
    }

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('cpf'));
  })

  it('Should return 400 if password is no provided.', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        cpf: "doe@mail.com"
      }
    }

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  })

  it('Should return 400 if password is invalid.', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        cpf: "doe@mail.com",
        password: "word"
      }
    }

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('password', "Senha com menos de 6 caracteres!"));
  })

  it('Should call ILogin with correct values.', async () => {
    const { sut, loginStub } = makeSut();
    const httpRequest = {
      body: {
        cpf: "doe@mail.com",
        password: "my_password"
      }
    }
    
    const handleSpy = jest.spyOn(loginStub, "handle");
    sut.handle(httpRequest);

    expect(handleSpy).toHaveBeenCalledWith({
      cpf: "doe@mail.com",
      password: "my_password"
    });
  })

  it('Should return 404 if ILogin return NotFoundError', async () => {
    const { sut, loginStub } = makeSut();
    const httpRequest = {
      body: {
        cpf: "doe@mail.com",
        password: "my_password"
      }
    }
    
    jest.spyOn(loginStub, "handle").mockImplementationOnce(() => {
      throw new NotFoundError();
    })
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(404);
    expect(httpResponse.body).toEqual("Usuário não encontrado!");
  })

  it('Should return 500 if ILogin throws', async () => {
    const { sut, loginStub } = makeSut();
    const httpRequest = {
      body: {
        cpf: "doe@mail.com",
        password: "my_password"
      }
    }
    
    jest.spyOn(loginStub, "handle").mockImplementationOnce(() => {
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
        cpf: "valid@mail.com",
        password: "valid_password"
      }
    }
    
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({ token: "token" });
  })
})
