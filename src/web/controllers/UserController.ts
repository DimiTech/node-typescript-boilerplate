import { inject } from 'inversify'
import {
  controller,
  BaseHttpController,
  requestBody,
  requestParam,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
} from 'inversify-express-utils'

import { TYPES } from '@infrastructure/inversify.config'
import UserService from '@app/services/UserService'
import IUser from '@domain/entities/IUser'
import valid from '@web/middleware/Validator'
import UserRequest from '@web/requests/UserRequest'

@controller('/users')
export class UserController extends BaseHttpController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super()
  }

  @httpPost('/', valid(UserRequest))
  public async newUser(
    @requestBody() newUser: IUser,
  ) {
    const createdUser = await this.userService.newUser(newUser)
    return this.json(createdUser, 201)
  }

  @httpGet('/')
  public async getUsers(): Promise<IUser[]> {
    return await this.userService.getUsers()
  }

  @httpGet('/:id')
  public async getUser(
    @requestParam('id') id: number,
  ) {
    id = +id
    if (typeof id !== 'number') {
      return this.json({ id }, 400)
    }
    return await this.userService.getUser(id)
  }

  @httpPut('/:id', valid(UserRequest))
  public async updateUser(
    @requestParam('id') id: number,
    @requestBody() user: IUser,
  ) {
    id = +id
    if (typeof id !== 'number') {
      return this.json({ id } , 400)
    }
    const updatedUser: IUser = await this.userService.updateUser(id, user)
    return this.json(updatedUser, 200)
  }

  @httpDelete('/:id')
  public async deleteUser(
    @requestParam('id') id: number,
  ) {
    id = +id
    if (typeof id !== 'number') {
      return this.json({ id } , 400)
    }
    const removedId = await this.userService.deleteUser(id)
    return this.json({ id: removedId }, 200)
  }
}
