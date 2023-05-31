import { UserLogin } from "../useCases/login/db-login-protocols";
import { User } from "./login-repository";

export interface UserSignUp extends UserLogin {
  name: string
}

export interface SignUpRepository {
  handle(user: UserSignUp): Promise<User>;
}
