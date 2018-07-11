import BuildStage from "./../buildStage"

export default class WasmBuildStage extends BuildStage {
  constructor(name, dependencies, disabled) {
    super(`wasm/${name}`, dependencies, disabled)
  }
}
