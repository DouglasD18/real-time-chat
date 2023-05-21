export interface UserLogin {
  email: string
  password: string
}

export interface ILogin {
  handle(user: UserLogin): Promise<string>;
}
