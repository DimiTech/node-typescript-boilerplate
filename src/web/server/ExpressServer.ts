import { injectable } from 'inversify'
import * as Express from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'
import * as bodyParser from 'body-parser'

import { container } from '@infrastructure/inversify.config'

import IServer from '@web/server/IServer'
import { IWebConfig } from '@web/web.config'

import '@web/controllers/Home'
import '@web/controllers/User'

@injectable()
export default class ExpressServer implements IServer {
  private server: InversifyExpressServer
  private serverInstance: Express.Application

  constructor() {
    this.server = new InversifyExpressServer(container)
    this.server.setConfig((app) => {
      app.use([
        bodyParser.urlencoded({ extended: true }),
        bodyParser.json(),
      ])
    })
    this.serverInstance = this.server.build()
  }

  public start(config: IWebConfig) {
    this.serverInstance.listen(config.port, () => {
      process.stdout.write(`Listening at: http://127.0.0.1:${config.port}\n`)
    })
  }

  public getServerObject(): Express.Application {
    return this.serverInstance
  }
}
