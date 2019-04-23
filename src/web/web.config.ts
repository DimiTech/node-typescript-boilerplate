export interface IWebConfig {
  port: number
}

export const WebConfig: IWebConfig = {
  port: parseInt(process.env.PORT || '1337', 10),
}
