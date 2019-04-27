import { injectable } from 'inversify'

import IUserRepository from '@infrastructure/repositories/IUserRepository'
import IUser from '@domain/entities/IUser'
import User from '@domain/entities/User'
import { plainToInstance } from '@infrastructure/utils/ObjectUtils'
import BaseRepository from '@infrastructure/repositories/BaseRepository'

@injectable()
export default class UserRepository extends BaseRepository implements IUserRepository {
  protected collection = 'users'

  public async getAll(): Promise<IUser[]> {
    try {
      const results = await this.db.collection(this.collection).find({}).toArray()
      return results.map(plain => plainToInstance(User, plain))
    } catch (e) {
      throw e
    }
  }

  public async insert(user: User): Promise<User> {
    try {
      const result = await this.db.collection(this.collection).insertOne(user)
      return plainToInstance(User, result.ops[0])
    } catch (e) {
      throw e
    }
  }

  public async getOne(id: number): Promise<User> {
    try {
      const result = await this.db.collection(this.collection).findOne({ id })
      return plainToInstance(User, result)
    } catch (e) {
      throw e
    }
  }

  public async update(id: number, user: IUser): Promise<User> {
    try {
      await this.db.collection(this.collection).replaceOne({ id }, { $set: user })
      return user
    } catch (e) {
      throw e
    }
  }

  public async delete(id: number): Promise<number> {
    try {
      const result = await this.db.collection(this.collection).findOneAndDelete({ id })
      return result.value.id
    } catch (e) {
      throw e
    }
  }
}
