import { MissingParamError } from 'presentation/errors/missing-param-error'
import { badRequest } from 'presentation/helpers/http-helpers'
import { HttpRequest, HttpResponse } from 'presentation/protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
