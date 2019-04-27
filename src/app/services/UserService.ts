import { injectable, inject } from 'inversify'

import IUser from '@domain/entities/IUser'
import IUserRepository from '@infrastructure/repositories/IUserRepository'
import { TYPES } from '@infrastructure/inversify.config'

@injectable()
export default class UserService {
  constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) {}

  public async newUser(user: IUser): Promise<IUser> {
    return await this.userRepository.insert(user)
  }

  public async getUsers(): Promise<IUser[]> {
    return await this.userRepository.getAll()
  }

  public async updateUser(id: number, user: IUser): Promise<IUser> {
    return this.userRepository.update(id, user)
  }

  public async getUser(id: number): Promise<IUser> {
    return this.userRepository.getOne(id)
  }

  public async deleteUser(id: number): Promise<number> {
    return await this.userRepository.delete(id)
  }
}
