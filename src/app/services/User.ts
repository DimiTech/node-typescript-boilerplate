import { injectable } from 'inversify'

import IUser from '@domain/entities/IUser'

@injectable()
export default class UserService {
  private static userStorage: IUser[] = [
    {
      id: 1,
      email: 'lorem@ipsum.com',
      name: 'Lorem',
    },
    {
      id: 2,
      email: 'doloe@sit.com',
      name: 'Dolor',
    },
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
