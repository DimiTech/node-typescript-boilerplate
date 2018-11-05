import IGreeter from '@app/domain/IGreeter'

class Greeter implements IGreeter {
  public greet(name: string) {
    console.dir(`Hello ${name}!`, { colors: true })
    // throw new Error('kako ide')
  }
}

export default Greeter
