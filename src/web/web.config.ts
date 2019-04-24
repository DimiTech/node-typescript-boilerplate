export interface IWebConfig {
  port: number
  environment: string
}

export const WebConfig: IWebConfig = {
  port: parseInt(process.env.PORT || '1337', 10),
  environment: process.env.ENVIRONMENT || 'development',
}
