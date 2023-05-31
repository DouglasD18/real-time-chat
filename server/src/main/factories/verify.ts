import { VerifyController } from "../../presentation/controllers/verify/verify";
import { DecrypterVerify } from '../../utils/decrypter/decrypter';

export const makeVerifyController = (): VerifyController => {
  const decrypter = new DecrypterVerify();
  return new VerifyController(decrypter);
}