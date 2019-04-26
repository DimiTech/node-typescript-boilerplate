import { expect } from 'chai'
import * as request from 'supertest'

import { server } from '@test/integration/Server.test'

describe('/', () => {
  describe('GET /', () => {
    it('Returns a banner', done => {
      request(server)
        .get('/')
        .end((_err, res) => {
          expect(res.status).to.equal(200)
          expect(res.text).to.equal('Hello Home!\n')
          done()
        })
    })
  })
})
