import { User } from "./login-repository";

export interface Encrypter {
  handle(user: User): string;
}