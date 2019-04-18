import IGreeter from '@app/domain/IGreeter'

class Greeter implements IGreeter {
  public greet(name: string) {
    process.stdout.write(`Hello ${name}!\n`)
  }
}

export default Greeter
