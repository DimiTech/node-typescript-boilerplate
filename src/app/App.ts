import { injectable, inject } from 'inversify'
import { TYPES } from '@infrastructure/inversify.config'

import IGreeter from '@app/domain/IGreeter'

@injectable()
export default class App {
  constructor(@inject(TYPES.IGreeter) private greeter: IGreeter) {}

  public run(): void {
    this.greeter.greet('World')
  }
}
