import { expect } from 'chai'

import UserService from '@app/services/UserService'
import IUser from '@domain/entities/IUser'
import User from '@domain/entities/User'
import IUserRepository from '@infrastructure/repositories/IUserRepository'

describe('UserService', () => {
  let service: UserService

  let mockUserStorage: IUser[] = [
    new User(1, 'lorem@ipsum.com', 'Lorem'),
    new User(2, 'doloe@sit.com', 'Dolor'),
  ]

  const mockUserRepository: IUserRepository = {
    insert: (user: User) => {
      mockUserStorage.push(user)
      return Promise.resolve(user)
    },
    // @ts-ignore
    getOne: id => Promise.resolve(mockUserStorage.find(u => u.id === id)),
    getAll: () => Promise.resolve(mockUserStorage),
    // @ts-ignore
    update: (id, user) => {
      mockUserStorage = mockUserStorage.map(u => {
        if (u.id === id) {
          return user
        }
        return u
      })
      return Promise.resolve(mockUserStorage.find(u => u.id === id))
    },
    delete: id => {
      mockUserStorage = mockUserStorage.filter(u => u.id !== id)
      return Promise.resolve(id)
    },
  }

  beforeEach(() => {
    service = new UserService(mockUserRepository)
  })

  it('Return all users', async () => {
    const users: IUser[] = await service.getUsers()
    expect(users).to.deep.equal([
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
    ])
    expect(users[0].getName()).to.equal('Lorem')
    expect(users[1].getName()).to.equal('Dolor')
  })

  it('Returns back the right user', async () => {
    const user = await service.getUser(1)
    expect(user).to.deep.equal({
      id: 1,
      email: 'lorem@ipsum.com',
      name: 'Lorem',
    })
  })

  it('Adds a new user', async () => {
    expect(await service.getUsers()).to.have.length(2)
    const newUser: IUser = await service.newUser(new User(3, 'test@test.com', 'test'))
    expect(newUser).to.deep.equal({
      id: 3,
      email: 'test@test.com',
      name: 'test',
    })
    expect(newUser.getName()).to.equal('test')
    expect(await service.getUsers()).to.have.length(3)
  })

  it('Updates an existing user', async () => {
    expect(await service.updateUser(3, new User(3, 'changed@changed.com', 'changed'))).to.deep.equal({
      id: 3,
      email: 'changed@changed.com',
      name: 'changed',
    })
    expect(await service.getUsers()).to.have.length(3)
  })

  it('Deletes a user', async () => {
    expect(await service.getUsers()).to.have.length(3)
    expect(await service.deleteUser(3)).to.equal(3)
    expect(await service.getUsers()).to.have.length(2)
  })
})
