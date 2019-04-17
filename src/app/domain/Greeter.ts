import IGreeter from '@app/domain/IGreeter'

class Greeter implements IGreeter {
  public greet(name: string) {
    process.stdout.write(`Hello ${name}!`)
    // throw new Error('kako ide')
  }
}

export default Greeter
