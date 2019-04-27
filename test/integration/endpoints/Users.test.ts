import { expect } from 'chai'
import * as request from 'supertest'

import { server } from '@test/integration/Server.test'
import User from '@domain/entities/User'

const BASE_PATH = '/users'

describe(BASE_PATH, () => {
  const usersForInsertion: User[] = [
    new User(1, 'test_1@test.com', 'test_1'),
    new User(2, 'test_2@test.com', 'test_2'),
    new User(3, 'test_3@test.com', 'test_3'),
  ]
  describe(`POST ${BASE_PATH}`, () => {
    usersForInsertion.forEach((user, i) => {
      it(`(${i + 1}) Creates new user`, done => {
        request(server)
          .post(BASE_PATH)
          .send(user)
          .then(res => {
            expect(res.status).to.equal(201)
            expect(res.body).to.deep.equal(user)
            done()
          })
      })
    })

    it('Does not create a new user if there are validation errors', done => {
      request(server)
        .post(BASE_PATH)
        .send({
          id: 3,
          email: 'test@test.com',
          // "name" propertymissing
        })
        .then(res => {
          expect(res.status).to.equal(422)
          expect(res.body.errors.length).to.equal(1)
          expect(res.body.errors[0].property).to.equal('name')
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
            { id: 1, email: 'test_1@test.com', name: 'test_1' },
            { id: 2, email: 'test_2@test.com', name: 'test_2' },
            { id: 3, email: 'test_3@test.com', name: 'test_3' },
          ])
          done()
        })
    })
  })

  describe(`GET ${BASE_PATH}/:id`, () => {
    it('Returns a single user', done => {
      request(server)
        .get(`${BASE_PATH}/1`)
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.deep.equal({ id: 1, email: 'test_1@test.com', name: 'test_1' })
          done()
        })
    })
  })

  describe(`PUT ${BASE_PATH}/:id`, () => {
    it('Updates a user', done => {
      request(server)
        .put(`${BASE_PATH}/1`)
        .send({ id: 1, email: 'changed@test.com', name: 'changed' })
        .then(res => {
          expect(res.status).to.equal(200)
          expect(res.body).to.deep.equal({ id: 1, email: 'changed@test.com', name: 'changed' })
          done()
        })
    })

    it('Does not update a user if there are validation errors in the payload', done => {
      request(server)
        .put(`${BASE_PATH}/1`)
        .send({
          id: 3,
          email: 'test@test.com',
          // "name" propertymissing
        })
        .then(res => {
          expect(res.status).to.equal(422)
          expect(res.body.errors.length).to.equal(1)
          expect(res.body.errors[0].property).to.equal('name')
          done()
        })
    })
  })

  describe(`DELETE ${BASE_PATH}/:id`, () => {
    [{ id: 1 }, { id: 2 }, { id: 3 }].forEach(expected => {
      it(`(${expected.id}) Deletes a user`, done => {
        request(server)
          .delete(`${BASE_PATH}/${expected.id}`)
          .then(res => {
            expect(res.status).to.equal(200)
            expect(res.body).to.deep.equal({ id: expected.id })
            done()
          })
      })
    })
  })
})
