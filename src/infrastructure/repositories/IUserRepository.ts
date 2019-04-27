import IUser from '@domain/entities/IUser'

export default interface IUserRepository {
  insert(user: IUser            ): Promise<IUser>
  getAll(                       ): Promise<IUser[]>
  getOne(id: number             ): Promise<IUser>
  update(id: number, user: IUser): Promise<IUser>
  delete(id: number             ): Promise<number>
}
