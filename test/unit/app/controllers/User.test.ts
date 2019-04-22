import { expect } from 'chai'
import { Request } from 'express'

import { UserController } from '@app/controllers/User'
import { UserService } from '@app/services/User'

describe('UserController', () => {
  let controller: UserController

  beforeEach(() => {
    controller = new UserController(new UserService())
  })

  it('Returns all users', () => {
    expect(controller.getUsers()).to.deep.equal([
      {
        id: 1,
        email: 'lorem@ipsum.com',
        name: 'Lorem'
      },
      {
        id: 2,
        email: 'doloe@sit.com',
        name: 'Dolor'
      }
    ])
  })

  it('Returns the right user', () => {
    expect(controller.getUser({
      params: {
        id: 1
      }
    } as Request)).to.deep.equal({
      id: 1,
      email: 'lorem@ipsum.com',
      name: 'Lorem'
    })
  })

  it('Adds a new user', () => {
    expect(controller.getUsers()).to.have.length(2)
    expect(
      controller.newUser({
        body: {
          id: 3,
          email: 'test@test.com',
          name: 'test'
        }
      } as Request)
    ).to.deep.equal({
      id: 3,
      email: 'test@test.com',
      name: 'test'
    })
    expect(controller.getUsers()).to.have.length(3)
  })

  it('Updates an existing user', () => {
    expect(
      controller.updateUser({
        body: {
          id: 3,
          email: 'changed@changed.com',
          name: 'Changed'
        },
        params: {
          id: 3
        }
      } as Request)
    ).to.deep.equal({
      id: 3,
      email: 'changed@changed.com',
      name: 'Changed'
    })
  })

  it('Deletes a user', () => {
    expect(controller.getUsers()).to.have.length(3)
    expect(
      controller.deleteUser({
        params: {
          id: 3
        }
      } as Request)
    ).to.deep.equal({ id: 3 })
    expect(controller.getUsers()).to.have.length(2)
  })
})
