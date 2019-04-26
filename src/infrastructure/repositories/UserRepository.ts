import { injectable, inject } from 'inversify'
import { Db, ObjectID } from 'mongodb'

import { TYPES } from '@infrastructure/inversify.config'
import MongoDBConnection from '@infrastructure/database/mongodb/MongoDBConnection'
import Logger from '@infrastructure/logging/Logger'
import IUser from '@domain/entities/IUser'

/**
 * 2. Create abstractions so that the Db can be interchangable
 * 3. Use database in the app
 * 4. Do unit tests by mocking out the DB
 * 5. Do integration tests with using an InMemoryDB
 * 6. Try implementing a PLAIN FILE database ?
 * 7. Make the app runnable without `docker-compose` ?
 */

function databaseConnected() {
  // tslint:disable-next-line
  console.log('databaseConnected(): evaluated')
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // tslint:disable-next-line
    console.log('databaseConnected(): called')
    // tslint:disable-next-line
    console.log('target')
    // tslint:disable-next-line
    console.log(target)
    // tslint:disable-next-line
    console.log('propertyKey')
    // tslint:disable-next-line
    console.log(propertyKey)
    // tslint:disable-next-line
    console.log('descriptor')
    // tslint:disable-next-line
    console.log(descriptor)
  }
}

@injectable()
export default class UserRepository {
  private db!: Db

  constructor(@inject(TYPES.IDBConnection) private mongoDBConnection: MongoDBConnection) {
    this.getDbConnection()
    // this.insert('users', new User(1, 'test@mail.com', 'dusan'), () => {
    //   process.stdout.write('insert successful\n')
    // })
  }

  @databaseConnected()
  public insert(collection: string, model: IUser, result: (error: any, data: any) => void): void {
    this.db.collection(collection).insertOne(model, (error, insert) => {
      // tslint:disable-next-line
      console.log('error:')
      // tslint:disable-next-line
      console.log(error)
      // tslint:disable-next-line
      console.log(error)
      // tslint:disable-next-line
      console.log('insert:')
      // tslint:disable-next-line
      console.log(insert)
      return result(error, insert.ops[0])
    })
  }

  // @ts-ignore
  public find(collection: string, filter: object, result: (error, data) => void): void {
    this.db.collection(collection).find(filter).toArray((error, find) => {
      return result(error, find)
    })
  }

  // @ts-ignore
  public findOneById(collection: string, objectId: string, result: (error, data) => void): void {
    this.db.collection(collection).find({ _id: new ObjectID(objectId) }).limit(1).toArray((error, find) => {
      return result(error, find[0])
    })
  }

  // @ts-ignore
  public update(collection: string, objectId: string, model: User, result: (error, data) => void): void {
    this.db.collection(collection).updateOne(
      { _id: new ObjectID(objectId) },
      { $set: model },
      (error, _update) => result(error, model),
    )
  }

  // @ts-ignore
  public remove(collection: string, objectId: string, result: (error, data) => void): void {
    this.db.collection(collection).deleteOne({ _id: new ObjectID(objectId) }, (error, remove) => {
      return result(error, remove)
    })
  }

  private async getDbConnection() {
    const { error, db } = await this.mongoDBConnection.getConnection()
    if (error) {
      Logger.error(error)
    } else if (db) {
      Logger.log('Database Client Connected!')
      this.db = db
    }
  }
}
