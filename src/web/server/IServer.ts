import { IWebConfig } from '@web/web.config'

export default interface IServer {
  start(config: IWebConfig): void,
  getServerObject(): any, // For integration testing
}
