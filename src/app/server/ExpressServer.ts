import { injectable } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import * as bodyParser from 'body-parser'

import { container } from '@infrastructure/inversify.config'

import IServer from '@app/server/IServer'
import { IAppConfig } from '@app/app.config'

import '@app/controllers/Home'
import '@app/controllers/User'

@injectable()
export default class Server implements IServer {
  private server: InversifyExpressServer

  constructor() {
    this.server = new InversifyExpressServer(container)
  }

  public configure() {
    this.server.setConfig((app) => {
      app.use([
        bodyParser.urlencoded({ extended: true }),
        bodyParser.json()
      ])
    })
  }

  public start(config: IAppConfig) {
    const serverInstance = this.server.build()
    serverInstance.listen(config.port, () => {
      process.stdout.write(`Listening at: http://127.0.0.1:${config.port}\n`)
    })
  }
}
