import { DbLogin } from "./db-login";
import { Encrypter, LoginRepository, NotFoundError, User, UserLogin } from "./db-login-protocols";

const USER: User = {
  id: "any_id",
  name: "any_name",
  email: "any@mail.com",
  password: "any_password"
}

interface SutTypes {
  sut: DbLogin
  loginRepositoryStub: LoginRepository
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    handle(user: User): Promise<string> {
      return new Promise(resolve => resolve("token"));
    }
  }

  return new EncrypterStub();
}

const makeLoginRepository = (): LoginRepository => {
  class LoginRepositoryStub implements LoginRepository {
    handle(user: UserLogin): Promise<User> {
      return new Promise(resolve => resolve(USER));
    }
  }

  return new LoginRepositoryStub();
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const loginRepositoryStub = makeLoginRepository();
  const sut = new DbLogin(loginRepositoryStub, encrypterStub);

  return {
    sut,
    loginRepositoryStub,
    encrypterStub
  }
}

describe('DbLogin', () => {
  it('Should call LoginRepository with correct values.', async () => {
    const { sut, loginRepositoryStub } = makeSut();
    const user = {
      email: "doe@mail.com",
      password: "password"
    }

    const handleSpy = jest.spyOn(loginRepositoryStub, "handle");
    await sut.handle(user);

    expect(handleSpy).toHaveBeenCalledWith(user);
  })

  it('Should return NotFoundError if LoginRepository returns null', async () => {
    const { sut, loginRepositoryStub } = makeSut();
    const user = {
      email: "doe@mail.com",
      password: "password"
    }

    jest.spyOn(loginRepositoryStub, "handle").mockImplementationOnce(() => {
      return new Promise(resolve => resolve(null));
    });
    const response = await sut.handle(user);
    
    expect(response).rejects.toThrow(NotFoundError);
  })

  it('Should throw if LoginRepository throws', async () => {
    const { sut, loginRepositoryStub } = makeSut();
    const user = {
      email: "doe@mail.com",
      password: "password"
    }

    jest.spyOn(loginRepositoryStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const response = sut.handle(user);
    
    expect(response).rejects.toThrow();
  })

  it('Should call Encrypter with correct values.', async () => {
    const { sut, encrypterStub } = makeSut();
    const user = {
      email: "doe@mail.com",
      password: "password"
    }

    const handleSpy = jest.spyOn(encrypterStub, "handle");
    await sut.handle(user);

    expect(handleSpy).toHaveBeenCalledWith(USER);
  })

  it('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    const user = {
      email: "doe@mail.com",
      password: "password"
    }

    jest.spyOn(encrypterStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const response = sut.handle(user);
    
    expect(response).rejects.toThrow();
  })

  it("Should return the correct values on success.", async () => {
    const { sut } = makeSut();

    const user = {
      email: "doe@mail.com",
      password: "password"
    }

    const response = await sut.handle(user);

    expect(response).toBe("token");
  })
})
