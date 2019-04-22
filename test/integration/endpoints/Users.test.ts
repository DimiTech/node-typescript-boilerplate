import { expect } from 'chai'
import * as request from 'supertest'

import { server } from '@test/integration/Server'

const BASE_PATH = '/users'

describe(BASE_PATH, () => {
  describe(`POST ${BASE_PATH}`, () => {
    it('Creates a new user', done => {
      request(server)
        .post(BASE_PATH)
        .send({
          id: 3,
          email: 'test@test.com',
          name: 'test',
        })
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.deep.equal({
            id: 3,
            email: 'test@test.com',
            name: 'test',
          })
          done()
        })
    })
  })

  describe(`GET ${BASE_PATH}`, () => {
    it('Returns list of users', done => {
      request(server)
        .get(BASE_PATH)
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.deep.equal([
            {
              id: 1,
              email: 'lorem@ipsum.com',
              name: 'Lorem',
            },
            {
              id: 2,
              email: 'doloe@sit.com',
              name: 'Dolor',
            },
            {
              id: 3,
              email: 'test@test.com',
              name: 'test',
            },
          ])
          done()
        })
    })
  })

  describe(`GET ${BASE_PATH}/:id`, () => {
    it('Returns a single user', done => {
      request(server)
        .get(`${BASE_PATH}/3`)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.deep.equal({
            id: 3,
            email: 'test@test.com',
            name: 'test',
          })
          done()
        })
    })
  })

  describe(`PUT ${BASE_PATH}/:id`, () => {
    it('Updates a user', done => {
      request(server)
        .put(`${BASE_PATH}/3`)
        .send({
          id: 3,
          email: 'changed@test.com',
          name: 'changed',
        })
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.deep.equal({
            id: 3,
            email: 'changed@test.com',
            name: 'changed',
          })
          done()
        })
    })
  })

  describe(`DELETE ${BASE_PATH}/:id`, () => {
    it('Deletes a user', done => {
      request(server)
        .delete(`${BASE_PATH}/3`)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.deep.equal({ id: 3 })
          done()
        })
    })
  })
})
