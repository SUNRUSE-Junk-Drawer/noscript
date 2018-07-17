import * as path from "path"
import mkdirp from "mkdirp"
import BuildStage from "./../buildStage"

import createDistDirectory from "./../createDistDirectory"

class CreateDirectoryBuildStage extends BuildStage {
  constructor() {
    super(`wasm/createDirectory`, [createDistDirectory], false)
  }

  performStart() {
    mkdirp(path.join(`dist`, `wasm`), error => this.handle(error, () => this.done()))
  }
}

export default new CreateDirectoryBuildStage()
