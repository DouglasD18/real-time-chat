import { Encrypter, ISignUp, SignUpRepository, UserSignUp } from "./db-sign-up-protocols";

export class DbSignUp implements ISignUp {
  constructor(
    private signUpRepository: SignUpRepository,
    private encrypter: Encrypter
  ) {}

  async handle(user: UserSignUp): Promise<string> {
    const userAccount = await this.signUpRepository.handle(user);
    
    const token = this.encrypter.handle(userAccount);

    return token;
  }
}
