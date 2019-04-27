import { expect } from 'chai'

import * as sinon from 'sinon'
import * as Express from 'express'
import { IsDefined, IsInt, Length, IsEmail, Min, Max, Allow, ValidationError } from 'class-validator'

import Validator from '@web/middleware/Validator'

interface ITestUser {
  id: number
  email: string
  name: string
  getName(): string
}
export default class TestUser implements ITestUser {
  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  public id: number

  @Length(7, 40)
  @IsEmail()
  public email: string

  @IsDefined()
  public name: string

  constructor(id: number, email: string, name: string) {
    this.id = id
    this.email = email
    this.name = name
  }

  @Allow()
  public getName() {
    return this.name
  }
}

describe('Validator middleware', () => {
  describe('Creates an instance from the plain object and validates it', () => {
    describe('Plain object in req.body is valid', () => {
      const validationMiddleware = Validator(TestUser)

      it('Returns an instance of the given class and calls next()', async () => {
        const mockReq = {
          body: {
            id: 1,
            email: 'test@mail.com',
            name: 'Test',
          },
        } as Express.Request

        const mockRes = {
          status : sinon.spy(),
          json   : sinon.spy(),
        } as unknown as Express.Response

        const fakeNext = sinon.spy()

        await validationMiddleware(mockReq, mockRes, fakeNext)
        expect(mockReq.body instanceof TestUser).to.be.true
        expect(mockReq.body).to.deep.equal({
          id: 1,
          email: 'test@mail.com',
          name: 'Test',
        })
        expect(fakeNext.calledOnce).to.be.true
      })
    })

    describe('Plain object in req.body has extra properties', () => {
      const validationMiddleware = Validator(TestUser)

      it('Creates an instance of the given class, prunes the extra properties and calls next()', async () => {
        const mockReq = {
          body: {
            _id: '5cc21e6350c9be006c4336cd',
            non_existent: 'Does not exist on the class',
            id: 1,
            email: 'test@mail.com',
            name: 'Test',
            extraFunction: () => 'Does not exist on the class',
          },
        } as Express.Request

        const mockRes = {
          status : sinon.spy(),
          json   : sinon.spy(),
        } as unknown as Express.Response

        const fakeNext = sinon.spy()

        await validationMiddleware(mockReq, mockRes, fakeNext)
        expect(mockReq.body instanceof TestUser).to.be.true
        expect(mockReq.body).to.deep.equal({
          id: 1,
          email: 'test@mail.com',
          name: 'Test',
        })
        expect(fakeNext.calledOnce).to.be.true
      })
    })

    describe('Plain object in req.body does not pass validation', () => {
      const validationMiddleware = Validator(TestUser)

      let statusSpy: sinon.SinonSpy
      let mockRes: any
      let fakeNext: sinon.SinonSpy

      beforeEach(() => {
        statusSpy = sinon.spy()
        mockRes = {
          status(code: number) {
            statusSpy(code)
            return this
          },
          json : sinon.spy(),
        }
        fakeNext = sinon.spy()
      })

      afterEach(() => {
        statusSpy.resetHistory()
        fakeNext.resetHistory()
      })

      it('Returns HTTP 422 with validation errors in body when all required properties are missing', async () => {
        const mockReq = {
          body: {
            _id: '5cc21e6350c9be006c4336cd',
            non_existent: 'Does not exist on the class',
            // id: 1,                  // Missing
            // email: 'test@mail.com', // Missing
            // name: 'Test',           // Missing
            extraFunction: () => 'Does not exist on the class',
          },
        } as Express.Request

        await validationMiddleware(mockReq, mockRes, fakeNext)
        expect(statusSpy.calledOnce).to.be.true
        expect(mockRes.json.calledOnce).to.be.true

        const validationError1 = new ValidationError()
        validationError1.value = undefined
        validationError1.property = 'id'
        validationError1.children = []
        validationError1.constraints = {
          max: 'id must not be greater than 9007199254740991',
          min: 'id must not be less than 0',
          isInt: 'id must be an integer number',
        }

        const validationError2 = new ValidationError()
        validationError2.value = undefined
        validationError2.property = 'email'
        validationError2.children = []
        validationError2.constraints = {
          isEmail: 'email must be an email',
          length: 'email must be longer than or equal to 7 characters',
        }

        const validationError3 = new ValidationError()
        validationError3.value = undefined
        validationError3.property = 'name'
        validationError3.children = []
        validationError3.constraints = {
          isDefined: 'name should not be null or undefined',
        }

        const expectedErrors = [ validationError1, validationError2, validationError3 ]
        expect(mockRes.json.getCalls()[0].args[0].errors).to.deep.equal(expectedErrors)

        expect(mockReq.body instanceof TestUser).to.be.false
        expect(mockReq.body).to.deep.equal(mockReq.body)
        expect(fakeNext.notCalled).to.be.true
      })

      it('Returns HTTP 422 with validation errors in body when one required property is missing', async () => {
        const mockReq = {
          body: {
            _id: '5cc21e6350c9be006c4336cd',
            non_existent: 'Does not exist on the class',
            id: 1,
            email: 'test@mail.com',
            // name: 'Test',        // Missing
            extraFunction: () => 'Does not exist on the class',
          },
        } as Express.Request

        await validationMiddleware(mockReq, mockRes, fakeNext)
        expect(statusSpy.calledOnce).to.be.true
        expect(mockRes.json.calledOnce).to.be.true

        const validationError = new ValidationError()
        validationError.value = undefined
        validationError.property = 'name'
        validationError.children = []
        validationError.constraints = {
          isDefined: 'name should not be null or undefined',
        }

        expect(mockRes.json.getCalls()[0].args[0].errors[0]).to.deep.equal(validationError)

        expect(mockReq.body instanceof TestUser).to.be.false
        expect(mockReq.body).to.deep.equal(mockReq.body)
        expect(fakeNext.notCalled).to.be.true
      })

      it('Returns HTTP 422 with validation errors in body when properties are not valid', async () => {
        const mockReq = {
          body: {
            _id: '5cc21e6350c9be006c4336cd',
            non_existent: 'Does not exist on the class',
            id: 1000000000000000000, // Too large
            email: 'testmail.com',   // Not an email
            name: 123,
            extraFunction: () => 'Does not exist on the class',
          },
        } as Express.Request

        await validationMiddleware(mockReq, mockRes, fakeNext)
        expect(statusSpy.calledOnce).to.be.true
        expect(mockRes.json.calledOnce).to.be.true

        const validationError1 = new ValidationError()
        validationError1.value = 1000000000000000000
        validationError1.property = 'id'
        validationError1.children = []
        validationError1.constraints = {
          max: 'id must not be greater than 9007199254740991',
        }

        const validationError2 = new ValidationError()
        validationError2.value = 'testmail.com'
        validationError2.property = 'email'
        validationError2.children = []
        validationError2.constraints = {
          isEmail: 'email must be an email',
        }

        const expectedErrors = [ validationError1, validationError2 ]

        expect(mockRes.json.getCalls()[0].args[0].errors).to.deep.equal(expectedErrors)

        expect(mockReq.body instanceof TestUser).to.be.false
        expect(mockReq.body).to.deep.equal(mockReq.body)
        expect(fakeNext.notCalled).to.be.true
      })
    })
  })
})
