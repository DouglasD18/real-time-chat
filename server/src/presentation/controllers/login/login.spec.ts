import { LoginController } from "./login";
import { ILogin, InvalidParamError, ServerError, UserLogin } from "./login-protocols";

interface ControllerTypes {
  controller: LoginController
  loginStub: ILogin
}

const makeLogin = (): ILogin => {
  class LoginStub implements ILogin {
    async handle(user: UserLogin): Promise<string> {
      return new Promise(resolve => resolve("token"));
    }
  }

  return new LoginStub();
}

const makeController = (): ControllerTypes => {
  const loginStub = makeLogin();
  const controller = new LoginController(loginStub);

  return {
    controller,
    loginStub
  }
}

describe('SignUp Controller', () => {
  it('Should return 400 if no password is invalid.', async () => {
    const { controller } = makeController();
    const httpRequest = {
      body: {
        email: "doe@mail.com",
        password: "word"
      }
    }

    const httpResponse = await controller.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('password', "Senha com menos de 6 caracteres!"));
  })

  it('Should call ILogin with correct values.', async () => {
    const { controller, loginStub } = makeController();
    const httpRequest = {
      body: {
        email: "doe@mail.com",
        password: "my_password"
      }
    }
    
    const handleSpy = jest.spyOn(loginStub, "handle");
    controller.handle(httpRequest);

    expect(handleSpy).toHaveBeenCalledWith({
      email: "doe@mail.com",
      password: "my_password"
    });
  })

  it('Should return 500 if ILogin throws', async () => {
    const { controller, loginStub } = makeController();
    const httpRequest = {
      body: {
        name: "John Doe",
        email: "doe@mail.com",
        password: "my_password",
        passwordConfirmation: "my_password"
      }
    }
    
    jest.spyOn(loginStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const httpResponse = await controller.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  })

  it('Should return 200 if valid values is provided.', async () => {
    const { controller } = makeController();
    const httpRequest = {
      body: {
        email: "valid@mail.com",
        password: "valid_password"
      }
    }
    
    const httpResponse = await controller.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual("token");
  })
})
