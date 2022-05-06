import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../../../main/factories/usecases/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../../../main/factories/usecases/add-account/db-add-account-factory'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../../main/factories/decorators/log-controller-decorator'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeDbAuthentication(), makeSignUpValidation())
  return makeLogControllerDecorator(controller)
}
