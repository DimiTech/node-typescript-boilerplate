process.env.ENVIRONMENT = 'testing'

import * as Express from 'express'

import App from '@web/App'
import IServer from '@web/server/IServer'
import ExpressServer from '@web/server/ExpressServer'

const expressServer: IServer = new ExpressServer()
const app: App = new App(expressServer)
app.run()

export const server: Express.Application = expressServer.getServerObject()
