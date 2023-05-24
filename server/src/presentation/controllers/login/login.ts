import { Controller, HttpRequest, HttpResponse, ILogin, InvalidParamError, badRequest, notFound, ok, serverError } from "./login-protocols";

export class LoginController implements Controller {
  constructor(private login: ILogin) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;

      if (password.length < 6) {
        return badRequest(new InvalidParamError("password", "Senha com menos de 6 caracteres!"));
      }

      const token = await this.login.handle({ email, password });

      return ok(token);
    } catch (error) {
      if (error.name == "NotFoundError") return notFound();

      return serverError();
    }
  }
}
