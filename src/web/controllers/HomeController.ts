import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import { Controller, Get } from '@overnightjs/core'

import { TYPES } from '@infrastructure/inversify.config'
import IGreeter from '@domain/services/IGreeter'

@injectable()
@Controller('/')
export class HomeController {
  constructor(@inject(TYPES.IGreeter) private greeter: IGreeter) {}

  @Get()
  public get(_req: Request, res: Response) {
    return res.end(this.greeter.greet())
  }
}
