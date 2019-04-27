import { injectable, inject } from 'inversify'
import { Db } from 'mongodb'

import { TYPES } from '@infrastructure/inversify.config'
import IDBConnection from '@infrastructure/database/IDBConnection'

@injectable()
export default abstract class BaseRepository {
  protected abstract collection: string
  protected db: Db = this.dbConnection.getConnection()

  constructor(
    @inject(TYPES.IDBConnection) private dbConnection: IDBConnection,
  ) {}
}
