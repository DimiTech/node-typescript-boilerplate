import { expect } from 'chai'

import { HomeController } from '@app/controllers/Home'
import Greeter from '@domain/Greeter'

describe('HomeController', () => {
  it('Returns a greeting', () => {
    const controller = new HomeController(new Greeter())
    expect(controller.get()).to.equal('Hello Home!\n')
  })
})
