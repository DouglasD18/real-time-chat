import { DbLogin } from "../../data/useCases/login/db-login";
import { LoginController } from "../../presentation/controllers/login/login";
import { EncrypterAdapter } from "../../utils/encrypter/encrypter";
import { MongoLoginRepository } from '../../infra/db/login-repository/mongo-login-repository';

export const makeLoginController = (): LoginController => {
  const loginRepository = new MongoLoginRepository();
  const encrypter = new EncrypterAdapter();
  const login = new DbLogin(loginRepository, encrypter);
  return new LoginController(login);
}