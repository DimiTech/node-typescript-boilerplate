import { WebConfig } from '@web/web.config'

export default class Logger {
  public static log(message: string): void {
    if (Logger.loggingEnabled) {
      // tslint:disable-next-line
      console.log(message)
    }
  }
  public static error(e: Error): void {
    if (Logger.loggingEnabled) {
      // tslint:disable-next-line
      console.error(e)
    }
  }
  private static loggingEnabled = WebConfig.environment !== 'testing'
}
