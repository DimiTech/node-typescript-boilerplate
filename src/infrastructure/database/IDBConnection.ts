import { Db } from 'mongodb'

export default interface IDBConnection {
  getConnection(): Db
  connect(): Promise<Db>
}
