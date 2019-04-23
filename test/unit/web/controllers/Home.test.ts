import { expect } from 'chai'

import { HomeController } from '@web/controllers/Home'
import Greeter from '@domain/services/Greeter'

describe('HomeController', () => {
  it('Returns a greeting', () => {
    const controller = new HomeController(new Greeter())
    expect(controller.get()).to.equal('Hello Home!\n')
  })
})
