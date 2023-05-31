import { User } from "@/data/protocols";
import { UserSignUp } from "@/data/protocols/sign-up-repository";
import { SignUpController } from "./sign-up";
import { ISignUp, InvalidParamError, MissingParamError, NotFoundError, ServerError } from "./sign-up-protocols";

const USER: User = {
  id: "any_id",
  name: "any_name",
  email: "valid@mail.com",
  password: "valid_password"
}

const BODY: UserSignUp = {
  name: "any_name",
  email: "valid@mail.com",
  password: "valid_password"
}

const TOKEN = "any_token";

interface SutTypes {
  sut: SignUpController
  signUpStub: ISignUp
}

const makeSignUpStub = (): ISignUp => {
  class SignUpStub implements ISignUp {
    handle(user: UserSignUp): Promise<string> {
      return new Promise(resolve => resolve(TOKEN));
    }
  }

  return new SignUpStub();
}

const makeSut = (): SutTypes => {
  const signUpStub = makeSignUpStub();
  const sut = new SignUpController(signUpStub);

  return {
    sut,
    signUpStub
  }
}

describe('SignUp Controller', () => {
  it('Should return 400 if name is no provided.', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: BODY.email,
        password: BODY.password
      }
    }

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  })

  it('Should return 400 if email is no provided.', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: BODY.name,
        password: BODY.password
      }
    }

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  })

  it('Should return 400 if password is no provided.', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: BODY.name,
        email: BODY.email
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
        name: BODY.name,
        email: BODY.email,
        password: "word"
      }
    }

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('password', "Senha com menos de 6 caracteres!"));
  })

  it('Should call ISignUp with correct values.', async () => {
    const { sut, signUpStub } = makeSut();
    const httpRequest = {
      body: BODY
    }
    
    const handleSpy = jest.spyOn(signUpStub, "handle");
    sut.handle(httpRequest);

    expect(handleSpy).toHaveBeenCalledWith(BODY);
  })

  it('Should return 500 if ISignUp throws', async () => {
    const { sut, signUpStub } = makeSut();
    const httpRequest = {
      body: BODY
    }
    
    jest.spyOn(signUpStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  })

  it('Should return 201 if valid values is provided.', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: BODY
    }
    
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse.body).toEqual({ token: TOKEN });
  })
})
