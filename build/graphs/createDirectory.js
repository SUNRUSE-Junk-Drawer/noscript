import * as path from "path"
import mkdirp from "mkdirp"
import BuildStage from "./../buildStage"

import deletePreviousBuilds from "./../deletePreviousBuilds"

class CreateDirectoryBuildStage extends BuildStage {
  constructor() {
    super(`graphs/createDirectory`, [deletePreviousBuilds])
  }

  performStart() {
    mkdirp(path.join(`dist`, `graphs`), error => this.handle(error, () => this.done()))
  }
}

export default new CreateDirectoryBuildStage()
