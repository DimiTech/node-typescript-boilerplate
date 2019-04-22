import { expect } from 'chai'
import * as sinon from 'sinon'

import App from '@web/App'

describe('App', () => {
  const mockServer = {
    start           : sinon.spy(),
    getServerObject : sinon.stub(),
  }
  const app: App = new App(mockServer)

  it('Initializes and starts the given server', () => {
    app.run()
    expect(mockServer.start.calledOnce).to.be.true
  })
})
