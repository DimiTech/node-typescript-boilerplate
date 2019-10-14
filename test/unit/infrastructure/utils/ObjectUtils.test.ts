import { expect } from 'chai'
import { Expose } from 'class-transformer'

import { plainToInstance } from '@infrastructure/utils/ObjectUtils'

interface ITestUser {
  id: number
  email: string
  name: string
  getName(): string
}
class TestUser implements ITestUser {
  @Expose() public id: number
  @Expose() public email: string
  @Expose() public name: string
  constructor(
    id: number,
    email: string,
    name: string,
  ) {
    this.id = id
    this.email = email
    this.name = name
  }
  public getName() {
    return this.name
  }
}

describe('makeClassInstance', () => {
  it('Creates an instsance of a class from a plain JavaScript object', () => {
    const plainUser = {
      id: 1,
      email: 'test@mail.com',
      name: 'Test',
    }

    const instance = plainToInstance(TestUser, plainUser)
    expect(instance).to.deep.equal(new TestUser(plainUser.id, plainUser.email, plainUser.name))
    expect(instance.getName()).to.equal('Test')
  })

  it.skip('Prunes the extraneous values', () => {
    const plainUser = {
      _id: '5cc21e6350c9be006c4336cd',
      non_existent: 'Does not exist on the class',
      id: 1,
      email: 'test@mail.com',
      name: 'Test',
      extraFunction: () => 'Does not exist on the class',
    }

    const instance = plainToInstance(TestUser, plainUser)
    expect(instance).to.deep.equal(new TestUser(plainUser.id, plainUser.email, plainUser.name))
    expect(instance.getName()).to.equal('Test')
  })

  // TODO: Add a test for some missing properties
})
