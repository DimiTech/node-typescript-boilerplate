import { IsDefined, IsInt, Length, IsEmail, Min, Max, Allow } from 'class-validator'
import { Expose } from 'class-transformer'

import IUser from '@domain/entities/IUser'

export default class UserRequest implements IUser {
  @Expose()
  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  public id: number

  @Expose()
  @Length(7, 40)
  @IsEmail()
  public email: string

  @Expose()
  @IsDefined()
  public name: string

  constructor(id: number, email: string, name: string) {
    this.id = id
    this.email = email
    this.name = name
  }

  @Expose()
  @Allow()
  public getName() {
    return this.name
  }
}
