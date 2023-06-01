import { Secret, sign } from "jsonwebtoken";
import { Encrypter, User } from "../../data/protocols";

const SECRET: Secret = process.env.JWT_SECRET || "issoeumasenha";

export class EncrypterAdapter implements Encrypter {
  handle(user: User): string {
    return sign(user, SECRET, {
      expiresIn: "7d"
    });
  }
}