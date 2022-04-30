import { TokenGenerator } from '../../../data/protocols/criptography/token-generator'
import { HashCompare } from '../../../data/protocols/criptography/hash-compare'
import { LoadAccountByEmailRepository } from '../../../data/protocols/db/load-account-by-email-repository'
import { AuthenticationModel } from '../../../domain/usecases/authentication'
import { UpdateAccessTokenRepository } from '../../../data/protocols/db/update-access-token-repository'

export class DbAuthentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashCompara: HashCompare
  private readonly tokenGenerator: TokenGenerator
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

  constructor (
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    hashCompara: HashCompare,
    tokenGenerator: TokenGenerator,
    updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashCompara = hashCompara
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(
      authentication.email
    )

    if (account) {
      const isValid = await this.hashCompara.compare(
        authentication.password,
        account.password
      )

      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.update(account.id, accessToken)
        return accessToken
      }
    }

    return null
  }
}
