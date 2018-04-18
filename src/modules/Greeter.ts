import IGreeter from '@app/interfaces/Greeter'

class Greeter implements IGreeter {
  greet(name: string) {
    console.dir(`Hello ${name}!`, { colors: true })
  }
}

export default Greeter

