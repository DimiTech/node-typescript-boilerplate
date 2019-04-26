export default interface IDBConnection {
  getConnection(): Promise<{ error: Error | null, db?: object | null }>
  connect(): Promise<{ error: Error | null, db?: object | null }>
}
