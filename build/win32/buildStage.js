import BuildStage from "./../buildStage"

export default class Win32BuildStage extends BuildStage {
  constructor(name, dependencies, disabled) {
    super(`win32/${name}`, dependencies, disabled)
  }
}
