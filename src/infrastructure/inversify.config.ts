import { Container } from 'inversify'

export const TYPES = {
  IDBConnection : Symbol.for('IDBConnection'),
  IServer       : Symbol.for('IServer'),
  UserService   : Symbol.for('UserService'),
  UserRepository: Symbol.for('UserRepository'),
  IGreeter      : Symbol.for('IGreeter'),
  App           : Symbol.for('App'),
}

import App from '@web/App'
import IDBConnection from '@infrastructure/database/IDBConnection'
import IServer from '@web/server/IServer'
import ExpressServer from '@web/server/ExpressServer'
import UserService from '@app/services/User'
import UserRepository from '@infrastructure/repositories/UserRepository'
import IGreeter from '@domain/services/IGreeter'
import Greeter from '@domain/services/Greeter'
import MongoDBConnection from '@infrastructure/database/mongodb/MongoDBConnection'

export const container = new Container()
container.bind<IDBConnection>(TYPES.IDBConnection).to(MongoDBConnection)
container.bind<IGreeter>(TYPES.IGreeter).to(Greeter)
container.bind<UserService>(TYPES.UserService).to(UserService)
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository)
container.bind<IServer>(TYPES.IServer).to(ExpressServer)
container.bind<App>(TYPES.App).to(App)
