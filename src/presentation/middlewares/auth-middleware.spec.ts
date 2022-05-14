import { AccessDeniedError } from '../../presentation/errors'
import { forbidden } from '../../presentation/helpers/http/http-helpers'
import { AutheMiddleware } from './auth-middleware'

describe('AuthMiddleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const sut = new AutheMiddleware()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
