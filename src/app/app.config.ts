export interface IAppConfig {
  port: number
}

export const AppConfig: IAppConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
}
