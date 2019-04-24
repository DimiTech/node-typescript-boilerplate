export default interface IServer {
  start(): void,
  getServerObject(): any, // For integration testing
}
