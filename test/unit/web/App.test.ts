import { expect } from 'chai'
import * as sinon from 'sinon'

import App from '@web/App'

describe('App', () => {
  const mockServer = {
    start           : sinon.spy(),
    getServerObject : sinon.stub(),
  }
  const mockDatabase = {
    getConnection : sinon.stub(),
    connect       : sinon.spy(),
  }
  const app: App = new App(mockServer, mockDatabase)

  it('Initializes and starts the given server', async () => {
    await app.run()
    expect(mockDatabase.connect.calledOnce).to.be.true
    expect(mockServer.start.calledOnce).to.be.true
  })
})
