import { injectable } from 'inversify'
import { Db, MongoClient } from 'mongodb'

import Logger from '@infrastructure/logging/Logger'
import IDBConnection from '@infrastructure/database/IDBConnection'
import { DBConfig } from '@infrastructure/database/db.config'

const connectionString = `mongodb://${DBConfig.user}:${DBConfig.pass}@${DBConfig.host}:${DBConfig.port}`
  + `/${DBConfig.dbName}`
const databaseName = DBConfig.dbName

@injectable()
export default class MongoDBConnection implements IDBConnection {
  private static instance: MongoDBConnection
  private isConnected = false
  private db!: Db

  constructor() {
    if (MongoDBConnection.instance) {
      return MongoDBConnection.instance
    }
    MongoDBConnection.instance = this
  }

  public getConnection(): Db {
    return this.db
  }

  public async connect(): Promise<Db> {
    if (this.isConnected) {
      return this.db
    }
    try {
      const client = await MongoClient.connect(connectionString, { useNewUrlParser: true })
      this.db = client.db(databaseName)
      this.isConnected = true
      Logger.log('MongoDB Connected!')
      return this.db
    } catch (e) {
      throw e
    }
  }
}
