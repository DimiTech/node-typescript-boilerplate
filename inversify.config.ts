import { Container } from 'inversify'
import IGreeter from './src/app/domain/IGreeter'
import Greeter from './src/app/domain/Greeter'

export const TYPES = {
  IGreeter: Symbol.for('IGreeter'),
}

export const container = new Container()
container.bind<IGreeter>(TYPES.IGreeter).to(Greeter)
