import { injectable, inject } from 'inversify'
import { Request, Response } from 'express'
import {
  Controller,
  Middleware,
  Get,
  Post,
  Put,
  Delete,
} from '@overnightjs/core'

import { TYPES } from '@infrastructure/inversify.config'
import UserService from '@app/services/UserService'
import IUser from '@domain/entities/IUser'
import User from '@domain/entities/User'
import Validator from '@web/middleware/Validator'

@injectable()
@Controller('users')
export class UserController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {}

  @Post()
  @Middleware(Validator(User))
  public async newUser(req: Request, res: Response) {
    const newUser: IUser = req.body
    const createdUser = await this.userService.newUser(newUser)
    return res.status(201).json(createdUser)
  }

  @Get()
  public async getUsers(_req: Request, res: Response) {
    const users: IUser[] = await this.userService.getUsers()
    return res.json(users)
  }

  @Get(':id')
  public async getUser(req: Request, res: Response) {
    const id: number = +req.params.id
    if (typeof id !== 'number') {
      return res.status(400).json({ id })
    }
    return res.json(await this.userService.getUser(id))
  }

  @Put(':id')
  @Middleware(Validator(User))
  public async updateUser(req: Request, res: Response) {
    const id: number = +req.params.id
    const user: IUser = req.body
    if (typeof id !== 'number') {
      return res.status(400).json({ id })
    }
    return res.json(await this.userService.updateUser(id, user))
  }

  @Delete(':id')
  public async deleteUser(req: Request, res: Response) {
    const id: number = +req.params.id
    if (typeof id !== 'number') {
      return res.status(400).json({ id })
    }
    const removedId = await this.userService.deleteUser(id)
    return res.json({ id: removedId })
  }
}
