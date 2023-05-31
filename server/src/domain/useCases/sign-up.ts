import { UserSignUp } from "../../data/protocols/sign-up-repository";

export interface ISignUp {
  handle(user: UserSignUp): Promise<string>;
}
