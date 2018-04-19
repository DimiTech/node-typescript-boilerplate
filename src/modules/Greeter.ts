import IGreeter from '@app/interfaces/Greeter'

class Greeter implements IGreeter {
  public greet(name: string) {
    console.dir(`Hello ${name}!`, { colors: true })
  }
}

export default Greeter
