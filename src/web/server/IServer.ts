import { IWebConfig } from '@web/web.config'

export default interface IServer {
  configure(): void,
  start(config: IWebConfig): void,
}
