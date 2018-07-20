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
    crossSpawn(
      this.commandName,
      this.argumentFactory(),
    ).on(`close`, exitCode => this.handle(exitCode, () => this.done()))
  }
}
