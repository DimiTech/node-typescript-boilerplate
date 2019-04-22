import { injectable, inject } from 'inversify'
import { TYPES } from '@infrastructure/inversify.config'

import IServer from '@app/server/IServer'
import { AppConfig } from '@app/app.config'

@injectable()
export default class App {
  constructor(@inject(TYPES.IServer) private server: IServer) {}

  public run(): void {
    this.server.configure()
    this.server.start(AppConfig)
  }
}
