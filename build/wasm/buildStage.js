import BuildStage from "./../buildStage"

export default class WasmBuildStage extends BuildStage {
  constructor(name, dependencies) {
    super(`wasm/${name}`, dependencies)
  }
}
