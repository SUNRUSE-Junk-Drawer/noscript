import crossSpawn from "cross-spawn"
import commandExists from "command-exists"
import BuildStage from "./buildStage"

export default class CommandLineBuildStage extends BuildStage {
  constructor(game, name, commandNames, argumentFactory, dependencies) {
    const commandName = commandNames.find(commandName => commandExists.sync(commandName))
    super(game, name, dependencies, !commandName)
    this.commandNames = commandNames
    this.argumentFactory = argumentFactory
    this.commandName = commandName
  }

  performStart() {
    let stdOut = ``
    let stdErr = ``
    const args = this.argumentFactory()
    const running = crossSpawn(
      Array.isArray(args)
        ? this.commandName
        : `${this.commandName} ${args}`,
      Array.isArray(args)
        ? args
        : { shell: true },
    )
    running.stdout.on(`data`, data => stdOut += data)
    running.stderr.on(`data`, data => stdErr += data)
    running.on(`close`, exitCode => this.handle((exitCode || stdErr) && `${exitCode}; ${stdOut}; ${stdErr}`, () => this.done()))
  }
}
