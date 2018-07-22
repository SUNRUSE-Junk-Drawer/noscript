import crossSpawn from "cross-spawn"
import commandExists from "command-exists"
import BuildStage from "./buildStage"

export default class CommandLineBuildStage extends BuildStage {
  constructor(name, commandName, argumentFactory, dependencies) {
    super(name, dependencies, !commandExists.sync(commandName))
    this.commandName = commandName
    this.argumentFactory = argumentFactory
  }

  performStart() {
    let stdOut = ``
    let stdErr = ``
    const running = crossSpawn(
      this.commandName,
      this.argumentFactory(),
    )
    running.stdout.on(`data`, data => stdOut += data)
    running.stderr.on(`data`, data => stdErr += data)
    running.on(`close`, exitCode => this.handle((exitCode || stdErr) && `${exitCode}; ${stdOut}; ${stdErr}`, () => this.done()))
  }
}
