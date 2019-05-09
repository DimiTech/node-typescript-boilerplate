import { injectable } from 'inversify'

import * as packageJson from '../../../package.json'
import IGreeter from '@domain/services/IGreeter'

@injectable()
export default class Greeter implements IGreeter {
  public greet(): string {
    return `Welcome to "${packageJson.name}", version: "${packageJson.version}"!\n`
  }
}
