import { HttpResponse } from "../protocols/http"
import { InvalidParamError, ServerError } from '../errors';

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const unauthorized = (): HttpResponse => {
  return {
    statusCode: 401,
    body: new InvalidParamError("token", "Token inválido!")
  }
}

export const notFound = (): HttpResponse => {
  return {
    statusCode: 404,
    body: "Usuário não encontrado!"
  }
}

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}
