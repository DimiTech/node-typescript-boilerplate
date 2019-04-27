import { inject } from 'inversify'
import { /*Request,*/ Response } from 'express'
import {
  controller,
  BaseHttpController,
  requestBody,
  requestParam,
  response,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
} from 'inversify-express-utils'

import { TYPES } from '@infrastructure/inversify.config'
import UserService from '@app/services/UserService'
import IUser from '@domain/entities/IUser'
import User from '@domain/entities/User'
import Validator from '@web/middleware/Validator'

@controller('/users')
export class UserController extends BaseHttpController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super()
  }

  @httpPost('/', Validator(User))
  public async newUser(
    @response() res: Response,
    @requestBody() newUser: IUser,
  ) {
    const createdUser = await this.userService.newUser(newUser)
    return res.status(201).json(createdUser)
  }

  @httpGet('/')
  public async getUsers(): Promise<IUser[]> {
    return await this.userService.getUsers()
  }

  @httpGet('/:id')
  public async getUser(
    @response() res: Response,
    @requestParam('id') id: number,
  ) {
    id = +id
    if (typeof id !== 'number') {
      return res.status(400).json({ id })
    }
    return await this.userService.getUser(id)
  }

  @httpPut('/:id', Validator(User))
  public async updateUser(
    @response() res: Response,
    @requestParam('id') id: number,
    @requestBody() user: IUser,
  ) {
    id = +id
    if (typeof id !== 'number') {
      return res.status(400).json({ id })
    }
    return await this.userService.updateUser(id, user)
  }

  @httpDelete('/:id')
  public async deleteUser(
    @response() res: Response,
    @requestParam('id') id: number,
  ) {
    id = +id
    if (typeof id !== 'number') {
      return res.status(400).json({ id })
    }
    const removedId = await this.userService.deleteUser(id)
    return { id: removedId }
  }
}
