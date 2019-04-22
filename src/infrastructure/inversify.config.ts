import { Container } from 'inversify'

export const TYPES = {
  IGreeter : Symbol.for('IGreeter'),
  App      : Symbol.for('App'),
}

import App from '@app/App'
import IGreeter from '@domain/IGreeter'
import Greeter from '@domain/Greeter'

export const container = new Container()
container.bind<IGreeter>(TYPES.IGreeter).to(Greeter)
container.bind<App>(TYPES.App).to(App)
