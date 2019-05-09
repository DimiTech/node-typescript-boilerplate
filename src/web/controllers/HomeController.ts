import { inject } from 'inversify'
import { controller, httpGet } from 'inversify-express-utils'

import { TYPES } from '@infrastructure/inversify.config'
import IGreeter from '@domain/services/IGreeter'

@controller('/')
export class HomeController {
  constructor(@inject(TYPES.IGreeter) private greeter: IGreeter) {}

  @httpGet('/')
  public get(): string {
    return this.greeter.greet()
  }
}
