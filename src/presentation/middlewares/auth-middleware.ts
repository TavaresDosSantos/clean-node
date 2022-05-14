import { AccessDeniedError } from '../../presentation/errors'
import { forbidden } from '../../presentation/helpers/http/http-helpers'
import { HttpRequest, HttpResponse, Middleware } from '../../presentation/protocols'

export class AutheMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise(resolve => resolve(forbidden(new AccessDeniedError())))
  }
}
