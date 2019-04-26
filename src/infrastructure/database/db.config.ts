export interface IDBConfig {
  host: string
  user: string
  pass: string
  port: number
  dbName: string
}

export const DBConfig: IDBConfig = {
  host: process.env.DB_HOST || '',
  user: process.env.DB_USER || '',
  pass: process.env.DB_PASS || '',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  dbName: process.env.DB_NAME || '',
}
