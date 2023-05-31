import { User } from "../../data/protocols";
import { IVerify } from "../../domain/useCases";
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || "issoeumasenha";

export class DecrypterVerify implements IVerify {
  handle(token: string): Promise<User> {
    const user = jwt.verify(token, SECRET);
    return new Promise(resolve => resolve(user as User));
  }
}
