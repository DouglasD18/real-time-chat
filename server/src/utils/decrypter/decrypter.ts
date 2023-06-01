import { User } from "../../data/protocols";
import { IVerify } from "../../domain/useCases";
import { JwtPayload, Secret, verify } from 'jsonwebtoken';

const SECRET: Secret = process.env.JWT_SECRET || "issoeumasenha";

export class DecrypterVerify implements IVerify {
  handle(token: string): Promise<User> {
    const user: string | JwtPayload = verify(token, SECRET);
    console.log(user);
    
    return new Promise(resolve => resolve(user as User));
  }
}