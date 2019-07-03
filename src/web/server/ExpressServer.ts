import { injectable } from 'inversify'
import * as Express from 'express'
import { Server } from '@overnightjs/core'
import * as helmet from 'helmet'
import * as bodyParser from 'body-parser'
import * as winston from 'winston'
import * as expressWinston from 'express-winston'

import { container, TYPES } from '@infrastructure/inversify.config'
import Logger from '@infrastructure/logging/Logger'
import IServer from '@web/server/IServer'
import { WebConfig } from '@web/web.config'

import * as Controllers from '../controllers'

const LOGGING_ENABLED = WebConfig.environment === 'development'

@injectable()
export default class ExpressServer extends Server implements IServer {
  private serverInstance: Express.Application

  constructor() {
    super(LOGGING_ENABLED)
    this.setupMiddleware()
    this.serverInstance = this.app
  }

  public start(): void {
    this.setupControllers()
    this.serverInstance.listen(WebConfig.port, () => {
      process.stdout.write(`Listening at: http://127.0.0.1:${WebConfig.port}\n`)
    })
  }

  public getServerObject(): Express.Application {
    return this.serverInstance
  }

  private setupControllers(): void {
    const controllerInstances: any[] = Object.keys(Controllers)
      .map(name => {
        // @ts-ignore - TODO: Find if there is a better way to do this.
        return container.get(TYPES[name])
      })
    super.addControllers(controllerInstances)
  }

  private setupMiddleware(): void {
    this.app.use([
      helmet(),
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
    this.app.use(this.errorHandler)
  }

  private errorHandler(err: any, _req: Express.Request, res: Express.Response, _next: Express.NextFunction): void {
    Logger.error(err)
    res.status(500).end()
  }
}
