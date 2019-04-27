import { injectable } from 'inversify'
import * as Express from 'express'
import { InversifyExpressServer } from 'inversify-express-utils'
import * as bodyParser from 'body-parser'
import * as winston from 'winston'
import * as expressWinston from 'express-winston'

import { container } from '@infrastructure/inversify.config'

import Logger from '@infrastructure/logging/Logger'
import IServer from '@web/server/IServer'
import { WebConfig } from '@web/web.config'

import '@web/controllers/HomeController'
import '@web/controllers/UserController'

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
        expressWinston.logger({
          transports: [
            new winston.transports.Console({
              silent: WebConfig.environment === 'testing',
            }),
          ],
          // @ts-ignore - TODO: Update "@types/winston" when version 3 comes out
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
          meta: false,
          msg: 'HTTP {{req.method}} {{req.url}}',
          ignoreRoute: () => false,
        }),
      ])
    })
    this.serverInstance = this.server.build()
    this.serverInstance.use(this.errorHandler)
  }

  public start() {
    this.serverInstance.listen(WebConfig.port, () => {
      process.stdout.write(`Listening at: http://127.0.0.1:${WebConfig.port}\n`)
    })
  }

  public getServerObject(): Express.Application {
    return this.serverInstance
  }

  private errorHandler(err: any, _req: Express.Request, res: Express.Response, _next: Express.NextFunction) {
    Logger.error(err)
    res.status(500).end()
  }
}
