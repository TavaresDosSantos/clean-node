import { TokenGenerator } from '../../../data/protocols/criptography/token-generator'
import { HashCompare } from '../../../data/protocols/criptography/hash-compare'
import { LoadAccountByEmailRepository } from '../../../data/protocols/db/load-account-by-email-repository'
import { AuthenticationModel } from '../../../domain/usecases/authentication'

export class DbAuthentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashCompara: HashCompare
  private readonly tokenGenerator: TokenGenerator

  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository, hashCompara: HashCompare, tokenGenerator: TokenGenerator) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashCompara = hashCompara
    this.tokenGenerator = tokenGenerator
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)

    if (account) {
      await this.hashCompara.compare(authentication.password, account.password)
      await this.tokenGenerator.generate(account.id)
    }

    return null
  }
}
