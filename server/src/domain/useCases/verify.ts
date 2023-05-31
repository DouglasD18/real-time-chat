import { User } from "../../data/protocols";

export interface IVerify {
  handle(token: string): Promise<User>;
}
