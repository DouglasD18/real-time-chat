import { Controller, HttpRequest, HttpResponse, ISignUp, InvalidParamError, MissingParamError, badRequest, created, ok, serverError } from "./sign-up-protocols";

export class SignUpController implements Controller {
  constructor(private signup: ISignUp) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredsFields = ["name", "cpf", "password"];
      for (const field of requiredsFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { name, cpf, password } = httpRequest.body;

      if (password.length < 6) {
        return badRequest(new InvalidParamError("password", "Senha com menos de 6 caracteres!"));
      }

      const token = await this.signup.handle({ name, cpf, password });

      return created({ token });
    } catch (error) {
      return serverError();
    }
  }
}
