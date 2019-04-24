import { Request, Response, NextFunction } from 'express'
import { Validator } from 'class-validator'
import { plainToClass } from 'class-transformer'

const validator = new Validator()

export default function ValidationMiddleware<T>(Type: new (...args: any[]) => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const object: T = plainToClass(Type, req.body as T, { strategy: 'excludeAll' })

    const validatorConfig = {
      skipMissingProperties: false,
      validationError: {
        target: false,
        value: true,
      },
    }
    const errors = await validator.validate(object, validatorConfig)
    if (errors.length > 0) {
      return res.status(422).json({ errors })
    }
    next()
  }
}
