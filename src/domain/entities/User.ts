import { IsDefined, IsInt, Length, IsEmail, Min, Max, Allow } from 'class-validator'

import IUser from '@domain/entities/IUser'

// TODO: Should this validation be in the domain?!
export default class User implements IUser {
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
