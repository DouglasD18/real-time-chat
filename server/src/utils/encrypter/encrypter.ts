import jwt from "jsonwebtoken";
import { Encrypter, User } from "../../data/protocols";

const SECRET = process.env.JWT_SECRET;

export class EncrypterAdapter implements Encrypter {
  handle(user: User): string {
    return jwt.sign(user, SECRET, {
      expiresIn: "7d"
    });
  }
}