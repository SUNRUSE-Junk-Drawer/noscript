import * as path from "path"
import mkdirp from "mkdirp"
import BuildStage from "./../buildStage"

import createDistDirectory from "./../createDistDirectory"

class CreateDistDirectoryBuildStage extends BuildStage {
  constructor() {
    super(`win32/createDistDirectory`, [createDistDirectory], false)
  }

  performStart() {
    mkdirp(path.join(`dist`, `win32`), error => this.handle(error, () => this.done()))
  }
}

export default new CreateDistDirectoryBuildStage()
