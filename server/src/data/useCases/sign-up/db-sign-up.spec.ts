import { DbSignUp } from './db-sign-up';
import { Encrypter, SignUpRepository, User, UserSignUp } from "./db-sign-up-protocols";

const USER: UserSignUp = {
  name: "any_name",
  cpf: "any@mail.com",
  password: "any_password"
}

const USER_ACCOUNT: User = {
  id: 'any_id',
  name: USER.name,
  cpf: USER.cpf,
  password: USER.password
}

interface SutTypes {
  sut: DbSignUp
  signUpRepositoryStub: SignUpRepository
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    handle(user: User): string {
      return "token";
    }
  }

  return new EncrypterStub();
}

const makeSignUpRepository = (): SignUpRepository => {
  class SignUpRepositoryStub implements SignUpRepository {
    handle(user: UserSignUp): Promise<User> {
      return new Promise(resolve => resolve(USER_ACCOUNT));
    }
  }

  return new SignUpRepositoryStub();
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const signUpRepositoryStub = makeSignUpRepository();
  const sut = new DbSignUp(signUpRepositoryStub, encrypterStub);

  return {
    sut,
    signUpRepositoryStub,
    encrypterStub
  }
}

describe('DbSignUp', () => {
  it('Should call SignUpRepository with correct values.', async () => {
    const { sut, signUpRepositoryStub } = makeSut();

    const handleSpy = jest.spyOn(signUpRepositoryStub, "handle");
    await sut.handle(USER);

    expect(handleSpy).toHaveBeenCalledWith(USER);
  })

  it('Should throw if SignUpRepository throws', async () => {
    const { sut, signUpRepositoryStub } = makeSut();

    jest.spyOn(signUpRepositoryStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const response = sut.handle(USER);
    
    expect(response).rejects.toThrow();
  })

  it('Should call Encrypter with correct values.', async () => {
    const { sut, encrypterStub } = makeSut();

    const handleSpy = jest.spyOn(encrypterStub, "handle");
    await sut.handle(USER);

    expect(handleSpy).toHaveBeenCalledWith(USER_ACCOUNT);
  })

  it('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();

    jest.spyOn(encrypterStub, "handle").mockImplementationOnce(() => {
      throw new Error();
    })
    const response = sut.handle(USER);
    
    expect(response).rejects.toThrow();
  })

  it("Should return the correct values on success.", async () => {
    const { sut } = makeSut();

    const response = await sut.handle(USER);

    expect(response).toBe("token");
  })
})
