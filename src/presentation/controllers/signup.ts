import { badRequest, serverError } from '../helpers/http-helpers'
import { InvalidParamError, MissingParamError } from '../errors'
import {
  EmailValidator,
  Controller,
  HttpRequest,
  HttpResponse
} from '../protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const { email, passowrd, passwordConfirmation } = httpRequest.body
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      if (passowrd !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
