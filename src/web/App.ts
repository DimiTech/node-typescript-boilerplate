import { injectable, inject } from 'inversify'
import { TYPES } from '@infrastructure/inversify.config'

import IServer from '@web/server/IServer'
import IDBConnection from '@infrastructure/database/IDBConnection'
import Logger from '@infrastructure/logging/Logger'

@injectable()
export default class App {
  constructor(
    @inject(TYPES.IServer) private server: IServer,
    @inject(TYPES.IDBConnection) private dbConnection: IDBConnection,
  ) {}

  public async run() {
    try {
      await this.dbConnection.connect()
      this.server.start()
    } catch (e) {
      Logger.log('Application failed to start!')
      Logger.error(e)
    }
  }
}
