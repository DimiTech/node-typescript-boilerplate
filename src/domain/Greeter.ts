import { injectable } from 'inversify'

import IGreeter from '@domain/IGreeter'

@injectable()
class Greeter implements IGreeter {
  public greet(name: string) {
    process.stdout.write(`Hello ${name}!\n`)
  }
}

export default Greeter
