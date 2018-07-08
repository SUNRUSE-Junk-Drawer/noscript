import BuildStage from "./../buildStage"

export default class Win32BuildStage extends BuildStage {
  constructor(name, dependencies) {
    super(`win32/${name}`, dependencies)
  }
}
