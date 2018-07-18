import * as childProcess from "child_process"
import commandExists from "command-exists"
import BuildStage from "./buildStage"

export default class CommandLineBuildStage extends BuildStage {
  constructor(name, commandName, argumentFactory, dependencies) {
    super(name, dependencies, !commandExists.sync(commandName))
    this.commandName = commandName
    this.argumentFactory = argumentFactory
  }

  performStart() {
    childProcess.execFile(
      this.commandName,
      this.argumentFactory(),
      (error, stdout, stderr) => this.handle(error, () => this.handle(stdout, () => this.handle(stderr, () => this.done())))
    )
  }
}
