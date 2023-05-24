import { Encrypter, ILogin, LoginRepository, NotFoundError, UserLogin } from "./db-login-protocols";

export class DbLogin implements ILogin {
  constructor(
    private loginRepository: LoginRepository,
    private encrypter: Encrypter
  ) {}

  async handle(user: UserLogin): Promise<string> {
    const exists = await this.loginRepository.handle(user);

    if (exists === null) throw new NotFoundError();

    const token = this.encrypter.handle(exists);

    return token;
  }
  
}