import { injectable } from 'inversify'
import { Db, MongoClient } from 'mongodb'
import IDBConnection from '@infrastructure/database/IDBConnection'
import { DBConfig } from '@infrastructure/database/db.config'

const connectionString = `mongodb://${DBConfig.user}:${DBConfig.pass}@${DBConfig.host}:${DBConfig.port}`
const databaseName = DBConfig.dbName

@injectable()
export default class MongoDBConnection implements IDBConnection {
  private isConnected = false
  private db!: Db

  constructor() {
    this.getConnection()
  }

  public async getConnection(): Promise<{ error: Error | null, db?: Db | null }> {
    if (this.isConnected) {
      return { error: null, db: this.db }
    } else {
      return await this.connect()
    }
  }

  public async connect(): Promise<{ error: Error | null, db?: Db | null }> {
    if (this.isConnected) {
      return { error: null, db: this.db }
    }
    try {
      const client = await MongoClient.connect(connectionString, { useNewUrlParser: true })
      this.db = client.db(databaseName)
      this.isConnected = true
      return { error: null, db: this.db }
    } catch (e) {
      return { error: e }
    }
  }
}
