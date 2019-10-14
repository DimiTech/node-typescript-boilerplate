import { Request, Response, NextFunction } from 'express'
import { Validator } from 'class-validator'

import { plainToInstance } from '@infrastructure/utils/ObjectUtils'

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
    const instance: T = plainToInstance(Type, req.body as T)

    /*
     * `.validate()` also strips additional properties from the `object` because
     * `validatorConfig.whitelist` has been set to `true`.
     * Since `validate()` has this mutating side-effect, probably a more elegant
     * solution should be considered in the future.
     */
    const errors = await validator.validate(instance, validatorConfig)

    if (errors.length > 0) {
      return res.status(422).json({ errors })
    } else {
      req.body = instance
      next()
    }
  }
}

// import { Request, Response, NextFunction } from 'express'
// import { Validator } from 'class-validator'

// import { plainToInstance } from '@infrastructure/utils/ObjectUtils'

// const validator = new Validator()

// const validatorConfig = {
//   whitelist: true,
//   skipMissingProperties: false,
//   validationError: {
//     target: false,
//     value: true,
//   },
// }

// export default function ValidationMiddleware<T>(Type: new (...args: any[]) => T) {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const instance = plainToInstance(Type, req.body)

//     /*
//      * `.validate()` also strips additional properties from the `object` because
//      * `validatorConfig.whitelist` has been set to `true`.
//      * Since `validate()` has this mutating side-effect, probably a more elegant
//      * solution should be considered in the future.
//      */
//     const errors = await validator.validate(instance, validatorConfig)

//     if (errors.length > 0) {
//       return res.status(422).json({ errors })
//     } else {
//       req.body = instance
//       next()
//     }
//   }
// }
