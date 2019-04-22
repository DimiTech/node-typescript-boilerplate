import { IAppConfig } from '@app/app.config'

export default interface IServer {
  configure(): void,
  start(config: IAppConfig): void,
}
