import { Db } from 'mongodb'

export default interface IDBConnection {
  getConnection(): Db
  connect(): Promise<{ error: Error | null, db?: object | null }>
}
