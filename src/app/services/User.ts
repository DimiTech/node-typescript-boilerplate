import { injectable } from 'inversify'

import IUser from '@domain/entities/IUser'
import User from '@domain/entities/User'

@injectable()
export default class UserService {
  private static userStorage: IUser[] = [
    new User(1, 'lorem@ipsum.com', 'Lorem'),
    new User(2, 'doloe@sit.com', 'Dolor'),
  ]

  public getUsers(): IUser[] {
    return UserService.userStorage
  }

  public getUser(id: number): (IUser | undefined) {
    return UserService.userStorage.find(user => user.id === id)
  }

  public newUser(user: IUser): IUser {
    UserService.userStorage.push(user)
    return user
  }

  public updateUser(id: number, user: IUser): IUser {
    UserService.userStorage.map((entry, index) => {
      if (entry.id === id) {
        UserService.userStorage[index] = user
      }
    })
    return user
  }

  public deleteUser(id: number): number {
    UserService.userStorage = UserService.userStorage.filter(user => user.id !== id)
    return id
  }
}
