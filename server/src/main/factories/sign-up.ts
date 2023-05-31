import { SignUpController } from "../../presentation/controllers/sign-up/sign-up";
import { DbSignUp } from '../../data/useCases/sign-up/db-sign-up';
import { EncrypterAdapter } from "../../utils/encrypter/encrypter";
import { MongoSignUpRepository } from '../../infra/db/sign-up-repository/mongo-sign-up-repository';

export const makeSignUpController = (): SignUpController => {
  const signUpRepository = new MongoSignUpRepository();
  const encrypter = new EncrypterAdapter();
  const signup = new DbSignUp(signUpRepository, encrypter);
  return new SignUpController(signup);
}