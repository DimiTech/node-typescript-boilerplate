import { expect } from 'chai'
import * as request from 'supertest'

import { server } from '@test/integration/Server.test'

describe('Web API global error handling', () => {
  it('Returns a 404 when requesting non-existent endpoints', done => {
    request(server)
      .post('/nonexistent')
      .end((_err, res) => {
        expect(res.status).to.equal(404)
        done()
      })
  })
})
