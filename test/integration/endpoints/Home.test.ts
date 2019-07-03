import { expect } from 'chai'
import * as request from 'supertest'

import * as packageJson from '../../../package.json'
import { getServerInstance } from '@test/integration/Server.test'

let server: any

before(async () => {
  server = await getServerInstance()
})

describe('/', () => {
  describe('GET /', () => {
    it('Returns a banner', done => {
      request(server)
        .get('/')
        .end((_err, res) => {
          expect(res.status).to.equal(200)
          expect(res.text).to.equal(`Welcome to "${packageJson.name}", version: "${packageJson.version}"!\n`)
          done()
        })
    })
  })
})
