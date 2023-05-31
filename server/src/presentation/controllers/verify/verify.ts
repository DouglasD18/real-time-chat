import { Controller, HttpRequest, HttpResponse, IVerify, MissingParamError, badRequest, ok, serverError, unauthorized } from "./verify-protocols";

export class VerifyController implements Controller {
  constructor(private verify: IVerify) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { token } = httpRequest.body;

      if (!token) return badRequest(new MissingParamError("token"));

      const user = await this.verify.handle(token);

      if (!user) return unauthorized();

      return ok({ email: user.email });
    } catch (error) {
      return serverError();
    }
  }
  
}