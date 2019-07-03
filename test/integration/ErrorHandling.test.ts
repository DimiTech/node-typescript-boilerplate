import { expect } from 'chai'
import * as request from 'supertest'

import { getServerInstance } from '@test/integration/Server.test'

let server: any

before(async () => {
  server = await getServerInstance()
})

describe('Web API global error handling', () => {
  it('Returns a 404 when requesting non-existent endpoints', done => {
    request(server)
      .post('/nonexistent')
      .end((_err, res) => {
        expect(res.status).to.equal(404)
        done()
      })
  })

  // TODO: Find a way to test this out? Trigger an error somehow !?
  // it('Returns a 500 Server Error when an error bubbles up to the catch-all express error handler', done => {
  //   request(server)
  //     .post('/nonexistent')
  //     .end((_err, res) => {
  //       expect(res.status).to.equal(404)
  //       done()
  //     })
  // })
})
