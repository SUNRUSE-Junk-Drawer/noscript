import BuildStage from "./../buildStage"

export default class MacOSBuildStage extends BuildStage {
  constructor(name, dependencies, disabled) {
    super(`macos/${name}`, dependencies, disabled)
  }
}
