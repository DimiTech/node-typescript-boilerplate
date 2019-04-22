import { expect } from 'chai'
import * as sinon from 'sinon'

import App from '@web/App'

describe('App', () => {
  const mockServer = {
    configure : sinon.spy(),
    start     : sinon.spy(),
  }
  const app: App = new App(mockServer)

  it('Initializes and starts the given server', () => {
    app.run()
    expect(mockServer.configure.calledOnce).to.be.true
    expect(mockServer.start.calledOnce    ).to.be.true
  })
})
