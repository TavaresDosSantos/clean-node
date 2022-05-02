import {
  UpdateAccessTokenRepository,
  HashCompare,
  AuthenticationModel,
  Encrypter,
  LoadAccountByEmailRepository
} from './db-authentication-protocols'

export class DbAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompar: HashCompare,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      authentication.email
    )

    if (account) {
      const isValid = await this.hashCompar.compare(
        authentication.password,
        account.password
      )

      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }

    return null
  }
}
