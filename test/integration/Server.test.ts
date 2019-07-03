import * as dotenv from 'dotenv'
dotenv.config()

process.env.ENVIRONMENT = 'testing'

import * as Express from 'express'

import App from '@web/App'
import IServer from '@web/server/IServer'
import ExpressServer from '@web/server/ExpressServer'
import IDBConnection from '@infrastructure/database/IDBConnection'
import MongoDBConnection from '@infrastructure/database/mongodb/MongoDBConnection'

const expressServer: IServer = new ExpressServer()
const mongoDBConnection: IDBConnection = new MongoDBConnection()
const app: App = new App(expressServer, mongoDBConnection)

let server: Express.Application

export async function getServerInstance(): Promise<Express.Application> {
  if (!server) {
    await app.run()
    server = expressServer.getServerObject()
    return server
  } else {
    return server
  }
}
