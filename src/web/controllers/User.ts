import { inject } from 'inversify'
import { Request } from 'express'
import {
  controller,
  BaseHttpController,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
} from 'inversify-express-utils'

import { TYPES } from '@infrastructure/inversify.config'
import UserService from '@app/services/User'
import IUser from '@domain/entities/IUser'
import User from '@domain/entities/User'
import Validator from '@web/middleware/Validator'

@controller('/users')
export class UserController extends BaseHttpController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super()
  }

  @httpGet('/')
  public getUsers(): IUser[] {
    return this.userService.getUsers()
  }

  @httpGet('/:id')
  public getUser(request: Request): (IUser | undefined) {
    const id = parseInt(request.params.id, 10)
    return this.userService.getUser(id)
  }

  @httpPost('/', Validator(User))
  public async newUser(request: Request) {
    const user: User = request.body
    return this.userService.newUser(user)
  }

  @httpPut('/:id')
  public updateUser(request: Request): IUser {
    const { body: user }: { body: IUser } = request
    const id = parseInt(request.params.id, 10)
    return this.userService.updateUser(id, user)
  }

  @httpDelete('/:id')
  public deleteUser(request: Request): { id: number } {
    const id = parseInt(request.params.id, 10)
    this.userService.deleteUser(id)
    return { id }
  }
}
