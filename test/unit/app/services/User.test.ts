import { expect } from 'chai'

import { UserService } from '@app/services/User'

describe('UserService', () => {
  let service: UserService

  beforeEach(() => {
    service = new UserService()
  })

  it('Return all users', () => {
    expect(service.getUsers()).to.deep.equal([
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
  })

  it('Returns back the right user', () => {
    expect(service.getUser(1)).to.deep.equal({
      id: 1,
      email: 'lorem@ipsum.com',
      name: 'Lorem',
    })
  })

  it('Adds a new user', () => {
    expect(service.getUsers()).to.have.length(2)
    expect(service.newUser({
      id: 3,
      email: 'test@test.com',
      name: 'test',
    })).to.deep.equal({
      id: 3,
      email: 'test@test.com',
      name: 'test',
    })
    expect(service.getUsers()).to.have.length(3)
  })

  it('Updates an existing user', () => {
    expect(service.updateUser(3, {
      id: 3,
      email: 'changed@changed.com',
      name: 'changed',
    })).to.deep.equal({
      id: 3,
      email: 'changed@changed.com',
      name: 'changed',
    })
  })

  it('Deletes a user', () => {
    expect(service.getUsers()).to.have.length(3)
    expect(service.deleteUser(3)).to.equal(3)
    expect(service.getUsers()).to.have.length(2)
  })
})
