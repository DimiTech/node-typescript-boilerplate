import { injectable } from 'inversify'

import IGreeter from '@domain/services/IGreeter'

@injectable()
export default class Greeter implements IGreeter {
  public greet(name: string): string {
    return `Hello ${name}!\n`
  }
}
