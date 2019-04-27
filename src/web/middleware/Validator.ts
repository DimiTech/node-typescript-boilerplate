import { Request, Response, NextFunction } from 'express'
import { Validator } from 'class-validator'
import { plainToClass } from 'class-transformer'

const validator = new Validator()

const validatorConfig = {
  whitelist: true,
  skipMissingProperties: false,
  validationError: {
    target: false,
    value: true,
  },
}

export default function ValidationMiddleware<T>(Type: new (...args: any[]) => T) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // TODO: Use ObjectUtils.plainToInstance()
    const object: T = plainToClass(Type, req.body as T)
    //   { // TODO: class-transform needs to be updated to enable this
    //     excludeExtraneousValues: true,
    //   },
    // )

    /*
     * `.validate()` also strips additional properties from the `object` because
     * `validatorConfig.whitelist` has been set to `true`.
     * Since `validate()` has this mutating side-effect, probably a more elegant
     * solution should be considered in the future.
     */
    const errors = await validator.validate(object, validatorConfig)

    if (errors.length > 0) {
      return res.status(422).json({ errors })
    } else {
      req.body = object
      next()
    }
  }
}
