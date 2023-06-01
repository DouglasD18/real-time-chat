export interface UserLogin {
  cpf: string
  password: string
}

export interface ILogin {
  handle(user: UserLogin): Promise<string>;
}
