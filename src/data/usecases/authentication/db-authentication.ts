import { HashCompare } from '../../../data/protocols/criptography/hash-compare'
import { LoadAccountByEmailRepository } from '../../../data/protocols/db/load-account-by-email-repository'
import { AuthenticationModel } from '../../../domain/usecases/authentication'

export class DbAuthentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashCompara: HashCompare

  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository, hashCompara: HashCompare) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashCompara = hashCompara
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)

    if (account) {
      await this.hashCompara.compare(authentication.password, account.password)
    }

    return null
  }
}
