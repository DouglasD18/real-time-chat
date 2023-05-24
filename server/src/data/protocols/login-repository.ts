import { UserLogin } from "@/domain/useCases/login";

export interface User extends UserLogin {
  id: string
  name: string
}

export interface LoginRepository {
  handle(user: UserLogin): Promise<User | null>;
}
